import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { BASE_URL, VIEWPORTS, ROUTES } from './config.js';

function findSystemChrome() {
  if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) {
    return process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  }
  const candidates = ['google-chrome-stable', 'google-chrome', 'chromium', 'chromium-browser'];
  for (const bin of candidates) {
    try {
      const path = execSync(`which ${bin} 2>/dev/null`, { encoding: 'utf-8' }).trim();
      if (path) return path;
    } catch { /* not found */ }
  }
  return null;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SCREENSHOTS_DIR = join(ROOT, 'screenshots');

async function autoScrollAndLoadImages(page) {
  // Smooth scroll to bottom to trigger lazy loading for all images
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });

  // Ensure all images are fully loaded and decoded
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete) {
          return img.decode ? img.decode().catch(() => { }) : Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = () => (img.decode ? img.decode().catch(() => { }).then(resolve) : resolve());
          img.onerror = resolve;
        });
      })
    );
  });
}

async function capturePage(page, url, viewportDir, name) {
  const filePath = join(viewportDir, `${name}.png`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await autoScrollAndLoadImages(page);
    await page.waitForTimeout(500);
    await page.screenshot({ path: filePath, fullPage: true });
    return { name, path: filePath, status: 'ok' };
  } catch (error) {
    return { name, path: null, status: 'error', error: error.message };
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function generateGallery(results, runDir) {
  const htmlRows = VIEWPORTS.map(vp => {
    const relDir = vp.name;
    const cells = results.filter(r => r.viewport === vp.name).map(r => {
      if (r.status === 'ok') {
        const relPath = `${relDir}/${r.name}.png`;
        return `<td><a href="${escapeHtml(relPath)}" target="_blank"><img src="${escapeHtml(relPath)}" alt="${escapeHtml(r.name)}" loading="lazy"></a><div class="label">${escapeHtml(r.name)}</div></td>`;
      }
      return `<td><div class="error">${escapeHtml(r.name)}<br><small>${escapeHtml(r.error || 'failed')}</small></div></td>`;
    });
    return `<tr><th>${vp.name} (${vp.width}×${vp.height})</th>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Screenshot Gallery</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f0f0f; color: #e5e5e5; padding: 2rem; }
h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
.meta { color: #888; font-size: 0.875rem; margin-bottom: 2rem; }
table { border-collapse: collapse; width: 100%; }
th { text-align: left; padding: 0.75rem; background: #1a1a1a; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #aaa; position: sticky; top: 0; }
td { padding: 0.75rem; vertical-align: top; border-bottom: 1px solid #222; }
td a { display: block; }
img { width: 100%; border-radius: 6px; border: 1px solid #2a2a2a; transition: border-color .2s; }
img:hover { border-color: #555; }
.label { font-size: 0.75rem; color: #888; margin-top: 0.375rem; text-align: center; }
.error { color: #f87171; font-size: 0.75rem; text-align: center; padding: 2rem 0; }
</style>
</head>
<body>
<h1>Screenshot Gallery</h1>
<p class="meta">${escapeHtml(String(results.length))} screenshots</p>
<table>
<thead><tr><th>Viewport</th><th>Screenshots</th></tr></thead>
<tbody>
${htmlRows}
</tbody>
</table>
</body>
</html>`;

  await writeFile(join(runDir, 'index.html'), html, 'utf-8');
}

async function main() {
  const systemChrome = findSystemChrome();
  const launchOptions = systemChrome
    ? { executablePath: systemChrome }
    : {};
  if (systemChrome) {
    console.log(`  Using system browser: ${systemChrome}`);
  }

  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();

  console.log(`\n  Capturing ${ROUTES.length} routes at ${BASE_URL}...\n`);

  const allResults = [];

  for (const vp of VIEWPORTS) {
    const viewportDir = join(SCREENSHOTS_DIR, vp.name);
    await mkdir(viewportDir, { recursive: true });
    console.log(`  [${vp.name}] ${vp.width}×${vp.height}`);

    await page.setViewportSize({ width: vp.width, height: vp.height });

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      const result = await capturePage(page, url, viewportDir, route.name);
      result.viewport = vp.name;
      allResults.push(result);
      const icon = result.status === 'ok' ? '✓' : '✗';
      console.log(`    ${icon} ${route.name}`);
    }
    console.log();
  }

  await generateGallery(allResults, SCREENSHOTS_DIR);

  await browser.close();

  const ok = allResults.filter(r => r.status === 'ok').length;
  const fail = allResults.filter(r => r.status === 'error').length;
  console.log(`  Done — ${ok} ok, ${fail} failed`);
  console.log(`  Gallery: ${join(SCREENSHOTS_DIR, 'index.html')}\n`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
