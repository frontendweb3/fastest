import * as esbuild from 'esbuild';
import chokidar from 'chokidar';
import tailwindPlugin from 'esbuild-plugin-tailwindcss';

const isWatch = process.argv.includes('--watch');
const watchGlobs = [
    'assets/**/*.{js,css}',
    '*.hbs',
    'partials/**/*.hbs',
];

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
    plugins: [tailwindPlugin()],
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
