import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark.css';
import CopyButtonPlugin from 'highlightjs-copy';
import 'highlightjs-copy/styles/highlightjs-copy.css';

import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

// Register languages with hljs core
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
// Add aliases for HTML
hljs.registerLanguage('html', xml);

hljs.addPlugin(
    new CopyButtonPlugin({
        autohide: true,
    }),
);

const lineNumbersReady = (async () => {
    window.hljs = hljs;
    await import('highlightjs-line-numbers.js');
})();

const highlightCodeBlocks = async () => {
    await lineNumbersReady;

    for (const block of document.querySelectorAll('pre code')) {
        if (!block.classList.contains('hljs')) {
            hljs.highlightElement(block);
        }

        if (
            typeof hljs.lineNumbersBlock === 'function' &&
            block.getAttribute('data-ln-applied') !== 'true'
        ) {
            hljs.lineNumbersBlock(block);
            block.setAttribute('data-ln-applied', 'true');
        }
    }
};
// Highlight code blocks on DOMContentLoaded, or immediately if the document is already loaded.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        void highlightCodeBlocks();
    });
} else {
    void highlightCodeBlocks();
}
