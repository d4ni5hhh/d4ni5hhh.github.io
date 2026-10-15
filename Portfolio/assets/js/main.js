// Mark active nav link based on current page
(function () {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href === path || (path === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();

// Theme toggle with persistence
(function () {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    if (stored) root.setAttribute('data-theme', stored);

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-toggle');
        if (!btn) return;
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        if (next === 'dark') root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
})();

// Mobile nav
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }));
})();

// Reveal on scroll
(function () {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
        els.forEach(el => el.classList.add('visible'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
})();

// Animate skill bars when visible
(function () {
    const bars = document.querySelectorAll('.bar > i');
    if (!bars.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.dataset.value || '80';
                requestAnimationFrame(() => { target.style.width = value + '%'; });
                io.unobserve(target);
            }
        });
    }, { threshold: 0.4 });
    bars.forEach(b => io.observe(b));
})();
