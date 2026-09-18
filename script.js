(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 768px)');
    const header = document.querySelector('header');
    const menu = document.getElementById('nav-menu');
    const menuButton = document.getElementById('btn-mobile');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    // Efeito original de iluminação gradual da Home.
    const home = document.getElementById('home');
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
        const homeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('home--dark');
                    setTimeout(() => entry.target.classList.add('home--lit'), 100);
                }
            });
        }, { threshold: 0.1 });
        homeObserver.observe(home);
    } else {
        home.classList.add('home--lit');
    }

    // Sem JavaScript, o menu permanece visível e os links funcionam normalmente.
    const setMenu = (open, returnFocus = false) => {
        menu.classList.toggle('active', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        document.body.classList.toggle('menu-open', open);
        main.inert = open;
        footer.inert = open;
        if (returnFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
        setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', event => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        const wasOpen = menu.classList.contains('active');
        setMenu(false);
        if (wasOpen) document.querySelector(link.getAttribute('href'))?.focus({ preventScroll: true });
    });
    document.addEventListener('keydown', event => {
        if (!menu.classList.contains('active')) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            setMenu(false, true);
        }
        if (event.key === 'Tab') {
            const controls = [...menu.querySelectorAll('a'), menuButton];
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        }
    });
    mobile.addEventListener('change', () => {
        const focusInMenu = menu.contains(document.activeElement);
        setMenu(false, mobile.matches && focusInMenu);
    });
    menuButton.hidden = false;
    header.classList.add('menu-ready');

    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // A navegação manual tem prioridade sobre a rolagem automática.
    const manualMovements = new Map();
    document.querySelectorAll('[data-carousel-prev], [data-carousel-next]').forEach(button => {
        button.hidden = false;
        button.addEventListener('click', () => {
            const carousel = document.querySelector(`[data-carousel="${button.dataset.carouselPrev || button.dataset.carouselNext}"]`);
            const direction = button.dataset.carouselPrev ? -1 : 1;
            const distance = carousel.clientWidth * 0.8;
            const previousMovement = manualMovements.get(carousel);
            if (previousMovement) cancelAnimationFrame(previousMovement.frame);
            manualMovements.delete(carousel);

            if (reducedMotion.matches) {
                carousel.scrollBy({ left: direction * distance, behavior: 'instant' });
                return;
            }

            const loopPoint = Number(carousel.dataset.loopPoint);
            let start = carousel.scrollLeft;
            if (loopPoint > 0) {
                start %= loopPoint;
                // No início, recuar para os cards do final usando a cópia do loop.
                if (direction < 0 && start < distance) start += loopPoint;
            }
            carousel.scrollLeft = start;
            const movement = { frame: 0, startedAt: null };
            manualMovements.set(carousel, movement);
            const move = time => {
                if (movement.startedAt === null) movement.startedAt = time;
                const progress = Math.min((time - movement.startedAt) / 400, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                carousel.scrollLeft = start + direction * distance * eased;
                if (progress < 1) {
                    movement.frame = requestAnimationFrame(move);
                } else {
                    const currentLoopPoint = Number(carousel.dataset.loopPoint);
                    if (currentLoopPoint > 0) carousel.scrollLeft %= currentLoopPoint;
                    manualMovements.delete(carousel);
                }
            };
            movement.frame = requestAnimationFrame(move);
        });
    });

    if (!reducedMotion.matches) {
        const carousels = [...document.querySelectorAll('[data-carousel]')];
        const hoveredCarousels = new Set();
        const focusedCarousels = new Set();
        carousels.forEach(carousel => {
            const originalCards = [...carousel.children];
            originalCards.forEach(card => {
                const copy = card.cloneNode(true);
                copy.setAttribute('aria-hidden', 'true');
                copy.tabIndex = -1;
                carousel.append(copy);
            });
            const updateLoopPoint = () => {
                carousel.dataset.loopPoint = carousel.children[originalCards.length].offsetLeft - carousel.children[0].offsetLeft;
            };
            updateLoopPoint();
            if ('ResizeObserver' in window) new ResizeObserver(updateLoopPoint).observe(carousel);
            carousel.style.scrollBehavior = 'auto';
        });

        let previousTime = 0;
        const speed = 38;
        const animateCarousels = time => {
            const elapsed = previousTime ? Math.min(time - previousTime, 64) : 0;
            previousTime = time;
            if (hoveredCarousels.size === 0 && focusedCarousels.size === 0 && manualMovements.size === 0) {
                carousels.forEach(carousel => {
                    const loopPoint = Number(carousel.dataset.loopPoint);
                    carousel.scrollLeft += speed * elapsed / 1000;
                    if (loopPoint > 0 && carousel.scrollLeft >= loopPoint) carousel.scrollLeft -= loopPoint;
                });
            }
            window.requestAnimationFrame(animateCarousels);
        };
        window.requestAnimationFrame(animateCarousels);

        carousels.forEach(carousel => {
            // Inclui as setas, que ficam fora da área rolável.
            const wrapper = carousel.closest('.products-carousel-wrap');
            wrapper.addEventListener('pointerenter', () => hoveredCarousels.add(carousel));
            wrapper.addEventListener('pointerleave', () => hoveredCarousels.delete(carousel));
            wrapper.addEventListener('focusin', () => focusedCarousels.add(carousel));
            wrapper.addEventListener('focusout', event => {
                if (!wrapper.contains(event.relatedTarget)) focusedCarousels.delete(carousel);
            });
        });
    }
})();
