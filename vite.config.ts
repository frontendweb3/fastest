import { defineConfig, Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import zipPack from 'vite-plugin-zip-pack'
import fs from 'node:fs'
import path from 'node:path'

function ghostHmrPlugin(): Plugin {
    return {
        name: 'ghost-hmr-hbs',
        configureServer(server) {
            // 1. Watch Handlebars templates
            server.watcher.add('**/*.hbs');

            // 2. Handle template changes for Ghost CMS and Tailwind CSS v4
            server.watcher.on('change', (file) => {
                if (file.endsWith('.hbs')) {
                    // Invalidate module graph so Tailwind CSS re-scans .hbs for new classes
                    server.moduleGraph.invalidateAll();
                    // Trigger full browser reload for Ghost CMS
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    });
                }
            });
        },
    };
}

function ghostCleanZipPlugin(): Plugin {
    let originalContent = '';
    const defaultHbsPath = path.resolve('.', 'default.hbs');

    return {
        name: 'ghost-clean-zip',
        apply: 'build',
        buildStart() {
            if (fs.existsSync(defaultHbsPath)) {
                originalContent = fs.readFileSync(defaultHbsPath, 'utf-8');
                const strippedContent = originalContent.replace(
                    /\s*<!-- BEGIN HMR DEV SCRIPT -->[\s\S]*?<!-- END HMR DEV SCRIPT -->\s*/g,
                    '\n'
                );
                fs.writeFileSync(defaultHbsPath, strippedContent, 'utf-8');
            }
        },
        closeBundle: {
            order: 'post',
            handler() {
                if (originalContent && fs.existsSync(defaultHbsPath)) {
                    fs.writeFileSync(defaultHbsPath, originalContent, 'utf-8');
                }
            }
        }
    };
}

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';

    return {
        server: {
            port: 5173,
            strictPort: true,
            cors: true,
            origin: 'http://localhost:5173',
            hmr: {
                host: 'localhost',
                port: 5173,
                protocol: 'ws',
            },
        },
        plugins: [
            ghostHmrPlugin(),
            isProduction && ghostCleanZipPlugin(),
            tailwindcss(),
            ViteImageOptimizer({
                test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
                includePublic: true,
                logStats: true,
                jpeg: { quality: 80 },
                jpg: { quality: 80 },
                png: { quality: 80 },
                webp: { quality: 80 },
            }),
            isProduction && zipPack({
                inDir: './', // Root of your theme
                outDir: './', // Where to place the zip
                outFileName: `${JSON.parse(fs.readFileSync(path.join('.', 'package.json'), 'utf-8')).name}.zip`,
                // Important: Filter what goes into the final zip
                filter: (fileName, filePath) => {
                    // Include compiled assets from dist
                    if (filePath.includes('assets/dist') || fileName === 'assets') return true
                    // Include hbs templates
                    if (fileName.endsWith('.hbs')) return true;
                    // Include partials folder
                    if (filePath.includes('partials')) return true;
                    // Include package.json
                    if (fileName === 'package.json') return true;
                    // Include LICENSE
                    if (fileName === 'LICENSE') return true;

                    // Exclude everything else (node_modules, source assets, etc)
                    return false;
                }
            })
        ],
        build: {
            outDir: 'assets/dist',
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    main: 'assets/js/main.js',
                    post: 'assets/js/post.js'
                },
                output: {
                    entryFileNames: 'js/[name].js',
                    chunkFileNames: 'js/[name].js',
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name?.endsWith('.css')) {
                            return 'css/[name][extname]';
                        }
                        if (assetInfo.name && /\.(jpe?g|png|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
                            const name = assetInfo.name.split('/').pop();
                            return `images/${name}`;
                        }
                        return 'assets/[name][extname]';
                    }
                }
            }
        },
    };
})
