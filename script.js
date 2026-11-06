/* Theme switch.
   Light is the default; a stored choice wins. The inline script in <head>
   applies the stored value before first paint, so this file only has to
   handle the button. */
(function () {
    var root = document.documentElement;
    var button = document.getElementById('themeToggle');
    if (!button) return;

    var label = button.querySelector('.visually-hidden');

    function current() {
        return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function apply(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }

        var isDark = theme === 'dark';
        button.setAttribute('aria-pressed', String(isDark));
        if (label) {
            label.textContent = isDark ? 'Switch to light mode' : 'Switch to dark mode';
        }

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', isDark ? '#0d1729' : '#f5f7fa');
    }

    // Sync the button to whatever the head script decided.
    apply(current());

    button.addEventListener('click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        apply(next);
        try {
            localStorage.setItem('theme', next);
        } catch (e) { /* private mode: the choice just won't persist */ }
    });
})();
