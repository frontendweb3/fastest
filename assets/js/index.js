// Dark Mode Toggle Logic
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
var themeToggleBtn = document.getElementById('theme-toggle');

function applyThemeState(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');

    if (themeToggleDarkIcon) {
        themeToggleDarkIcon.classList.toggle('hidden', isDark);
    }
    if (themeToggleLightIcon) {
        themeToggleLightIcon.classList.toggle('hidden', !isDark);
    }
    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        themeToggleBtn.setAttribute(
            'aria-label',
            isDark ? 'Switch to light mode' : 'Switch to dark mode',
        );
    }
}

if (themeToggleBtn) {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var storedTheme = localStorage.getItem('color-theme');
    var isDark = storedTheme ? storedTheme === 'dark' : prefersDark;

    applyThemeState(isDark);

    themeToggleBtn.addEventListener('click', function () {
        isDark = !document.documentElement.classList.contains('dark');
        applyThemeState(isDark);
    });
}

// Sidebar Toggle Logic
const sidebarShowBtn = document.getElementById('logly-sidebar-show');
const sidebarHideBtn = document.getElementById('logly-sidebar-hide');
const sidebar = document.getElementById('default-sidebar');

if (sidebarShowBtn && sidebarHideBtn && sidebar) {
    sidebarShowBtn.setAttribute('aria-expanded', 'false');
    sidebarHideBtn.setAttribute('aria-expanded', 'true');

    sidebarShowBtn.addEventListener('click', function () {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
        sidebarShowBtn.classList.add('hidden'); // Hide show button
        sidebarHideBtn.classList.remove('hidden'); // Show hide button
        sidebarShowBtn.setAttribute('aria-expanded', 'true');
        sidebarHideBtn.setAttribute('aria-expanded', 'true');
    });

    sidebarHideBtn.addEventListener('click', function () {
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
        sidebarShowBtn.classList.remove('hidden'); // Show show button
        sidebarHideBtn.classList.add('hidden'); // Hide hide button
        sidebarShowBtn.setAttribute('aria-expanded', 'false');
        sidebarHideBtn.setAttribute('aria-expanded', 'false');
    });
}

// Ensure correct button visibility on page load (sidebar starts hidden)
// This part could be optionally added to the main theme check or here for clarity
document.addEventListener('DOMContentLoaded', function () {
    if (sidebar && sidebarShowBtn && sidebarHideBtn) {
        const syncSidebarState = () => {
            const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
            const isHidden =
                sidebar.classList.contains('-translate-x-full') && !isDesktop;

            if (isHidden) {
                sidebarShowBtn.classList.remove('hidden');
                sidebarHideBtn.classList.add('hidden');
                sidebarShowBtn.setAttribute('aria-expanded', 'false');
                sidebarHideBtn.setAttribute('aria-expanded', 'false');
            } else {
                sidebarShowBtn.classList.add('hidden');
                sidebarHideBtn.classList.remove('hidden');
                sidebarShowBtn.setAttribute('aria-expanded', 'true');
                sidebarHideBtn.setAttribute('aria-expanded', 'true');
            }
        };

        syncSidebarState();
        window.addEventListener('resize', syncSidebarState);
    }
});
