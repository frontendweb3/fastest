import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import zipPack from 'vite-plugin-zip-pack';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';

    return {
        plugins: [
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
            isProduction &&
                zipPack({
                    inDir: './',
                    outDir: './',
                    outFileName: `${JSON.parse(fs.readFileSync(path.join('.', 'package.json'), 'utf-8')).name}.zip`,
                    filter: (fileName, filePath) => {
                        if (filePath.includes('assets/dist')) return true;
                        if (fileName.endsWith('.hbs')) return true;
                        if (filePath.includes('partials')) return true;
                        if (fileName === 'package.json') return true;
                        if (fileName === 'LICENSE') return true;

                        return false;
                    },
                }),
        ],
        build: {
            outDir: 'assets/dist',
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    index: 'assets/js/index.js',
                    post: 'assets/js/post.js',
                    styles: 'assets/css/styles.css',
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
                    },
                },
            },
        },
    };
});
