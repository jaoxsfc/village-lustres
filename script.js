// ===== SCRIPT COMPLETO OTIMIZADO =====
(function() {
    // Hero light effect com IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('home--dark');
                setTimeout(() => entry.target.classList.add('home--lit'), 100);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(document.getElementById('home'));

    // Mobile Menu
    const btnMobile = document.getElementById('btn-mobile');
    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        document.getElementById('nav-menu').classList.toggle('active');
    }
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
    
    // Fechar menu ao clicar link
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('nav-menu').classList.remove('active');
        });
    });

    // Smooth scroll para todos os links internos
    document.querySelectorAll('nav a, .btn-catalog, .store-box, .loja-24h-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                target?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Performance: Remove listeners quando não necessário
    window.addEventListener('load', () => {
        // Analytics ou outros scripts pesados aqui
    });
})();