import * as esbuild from 'esbuild';
import chokidar from 'chokidar';
import { cp, mkdir } from 'node:fs/promises';
import tailwindPlugin from 'esbuild-plugin-tailwindcss';

const isWatch = process.argv.includes('--watch');

const watchGlobs = [
    'assets/**/*.{js,css}',
    'assets/**/*.{png,jpg,jpeg,gif,svg}',
    '*.hbs',
    'partials/**/*.hbs',
];

const copyImagesPlugin = {
    name: 'copy-images',
    setup(build) {
        build.onEnd(async () => {
            try {
                await mkdir('assets/dist/images', { recursive: true });
                await cp('assets/images', 'assets/dist/images', { recursive: true });
                console.log('Copied assets/images → assets/dist/images');
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.warn('No assets/images directory to copy.');
                    return;
                }
                console.error('Failed to copy images:', error);
            }
        });
    },
};

const buildOptions = {
    entryPoints: [
        'assets/js/index.js',
        'assets/js/post.js',
        'assets/css/styles.css',
    ],
    bundle: true,
    minify: true,
    minifyWhitespace: true,
    outdir: 'assets/dist',
    plugins: [tailwindPlugin(), copyImagesPlugin ]
};

async function run() {
    try {
        if (isWatch) {
            const context = await esbuild.context(buildOptions);
            await context.watch();

            const watcher = chokidar.watch(watchGlobs, {
                ignoreInitial: true,
                ignored: ['assets/dist/**', 'node_modules/**', '.git/**'],
            });

            let rebuildChain = Promise.resolve();
            watcher.on('all', (_, filePath) => {
                rebuildChain = rebuildChain.then(async () => {
                    console.log(
                        `Change detected in ${filePath}; rebuilding assets...`,
                    );
                    try {
                        await context.rebuild();
                        console.log('Rebuild complete.');
                    } catch (rebuildError) {
                        console.error('Rebuild failed:', rebuildError);
                    }
                });
            });

            const cleanExit = async () => {
                await watcher.close();
                await context.dispose();
                process.exit(0);
            };

            process.on('SIGINT', cleanExit);
            process.on('SIGTERM', cleanExit);

            console.log('Watching for changes (JS/CSS/templates)...');
        } else {
            const result = await esbuild.build(buildOptions);
            console.log('Build successful:', result);
        }
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

run();
