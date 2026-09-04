// Import styles
import '../css/styles.css';

// Import utilities
import './alpine.js';  // Initialize Alpine.js
import './icons.js';   // Initialize Lucide icons

// Help Vite discover images for optimization
import.meta.glob('../images/**/*.{png,jpg,jpeg,svg,webp,avif}', { eager: true });

export const getCommentAccentColor = () => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--accent, #29319fff)';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';

    document.body.appendChild(probe);
    const accentColor = getComputedStyle(probe).color;
    probe.remove();

    return accentColor;
};

export const syncCommentTheme = () => {
    const commentsScript = document.querySelector('script[data-ghost-comments]');
    const commentsRoot = document.getElementById('ghost-comments-root');
    const commentsFrame = commentsRoot?.querySelector('iframe[title="comments-frame"]');
    const commentsDocument = commentsFrame?.contentDocument;
    const isDarkTheme = document.documentElement.classList.contains('dark');

    if (commentsScript) {
        commentsScript.dataset.colorScheme = isDarkTheme ? 'dark' : 'light';
        commentsScript.dataset.accentColor = getCommentAccentColor();
    }

    if (!commentsDocument || !commentsDocument.body) {
        if (commentsFrame) {
            commentsFrame.addEventListener('load', syncCommentTheme, { once: true });
        }
        return;
    }

    if (commentsDocument.documentElement) {
        commentsDocument.documentElement.classList.toggle('dark', isDarkTheme);
    }
    if (commentsDocument.body) {
        commentsDocument.body.classList.toggle('dark', isDarkTheme);
    }

    const commentSection = commentsDocument.querySelector('body > section.ghost-display-content');
    if (commentSection) {
        commentSection.classList.toggle('dark', isDarkTheme);
    } else if (commentsFrame) {
        commentsFrame.addEventListener('load', syncCommentTheme, { once: true });
    }
};

// Make syncCommentTheme globally accessible on window for Alpine.js and theme toggles
window.syncCommentTheme = syncCommentTheme;

// Auto-sync when DOM is loaded, when window/iframes load, and when <html class="dark"> changes via Alpine.js
document.addEventListener('DOMContentLoaded', () => {
    syncCommentTheme();

    // Observe changes to <html class="dark"> triggered by Alpine.js themeSwitcher
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                syncCommentTheme();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});

window.addEventListener('load', () => {
    syncCommentTheme();
});