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
