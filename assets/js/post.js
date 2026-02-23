// Highlight.js initialization and configuration for copy code button in posts.

document.addEventListener('DOMContentLoaded', function () {
    if (window.hljs) {
        // Full bundle is loaded plus key language modules to guarantee React/JS/HTML/CSS
        hljs.highlightAll();
        hljs.initLineNumbersOnLoad();
        hljs.configure({
            languages: ['javascript', 'typescript', 'jsx', 'xml', 'css'],
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('pre').forEach((pre) => {
        if (pre.querySelector('.copy-icon')) return;

        pre.classList.add('relative');

        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.setAttribute('aria-label', 'copy code button');
        copyBtn.className =
            'copy-icon copy-code-btn absolute top-2 right-2 md:top-3 md:right-3 z-10 flex size-9 md:size-10 items-center justify-center p-0 rounded-md ' +
            'border border-slate-200 bg-white text-black dark:text-white shadow-sm transition-all duration-200 hover:scale-[1.02] dark:border-slate-700 dark:bg-slate-800';
        copyBtn.innerHTML =
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

        const copiedBtn = document.createElement('button');
        copiedBtn.type = 'button';
        copiedBtn.className =
            'copied-icon copy-code-btn hidden absolute top-2 right-2 md:top-3 md:right-3 z-10 flex size-9 md:size-10 items-center justify-center p-0 rounded-md ' +
            'border border-slate-200 bg-white text-black dark:text-white shadow-sm transition-all duration-200 dark:border-slate-700 dark:bg-slate-800';
        copiedBtn.setAttribute('aria-label', 'Code copied');
        copiedBtn.innerHTML =
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

        pre.appendChild(copyBtn);
        pre.appendChild(copiedBtn);

        copyBtn.addEventListener('click', async () => {
            const code = pre.querySelector('code').innerText;
            await navigator.clipboard.writeText(code);

            copyBtn.classList.add('hidden');
            copiedBtn.classList.remove('hidden');
            copiedBtn.classList.add('animate-in', 'fade-in', 'zoom-in');

            setTimeout(() => {
                copiedBtn.classList.add('animate-out', 'fade-out', 'zoom-out');
                setTimeout(() => {
                    copyBtn.classList.remove('hidden');
                    copiedBtn.classList.add('hidden');
                    copiedBtn.classList.remove(
                        'animate-in',
                        'fade-in',
                        'zoom-in',
                        'animate-out',
                        'fade-out',
                        'zoom-out',
                    );
                }, 300);
            }, 1500);
        });
    });
});
