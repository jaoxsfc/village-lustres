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

    // CATÁLOGO EDITÁVEL
    // Para atualizar a vitrine, altere os 6 itens de cada seção abaixo.
    // Em cada item: name (nome), image (foto), marketplace (plataforma), url (link direto) e badge (selo opcional).
    // Quando "url" não for informado, o card levará à loja oficial da plataforma escolhida.
    const marketplaceLinks = {
        mercadoLivre: 'https://www.mercadolivre.com.br/pagina/villageshopping?category_id=MLB189195&item_id=MLB3952702131&recos_listing=true&client=recoview-selleritems&seller_id=206375372#origin=vpp',
        shopee: 'https://shopee.com.br/villagelustres'
    };
    const productCatalog = {
        'mais-vendidos': {
            moreMarketplace: 'mercadoLivre',
            products: [
                {
                    name: 'Trilho Perfil LED para Iluminação Industrial',
                    marketplace: 'mercadoLivre',
                    image: 'assets/produtos/trilho.webp',
                    url: 'https://www.mercadolivre.com.br/trilho-perfil-led-iluminacao-industrial-closet-cozinha-sala-estrutura-preto/p/MLB43875716?pdp_filters=item_id%3AMLB6927854852',
                    badge: 'Mais vendido'
                },
                {
                    name: 'Kit 5 Lâmpadas Dicróica LED 6,5W Branco Quente',
                    marketplace: 'mercadoLivre',
                    image: 'assets/produtos/dicroica.webp', // Troque por exemplo para: 'dicroica.webp'
                    url: 'https://www.mercadolivre.com.br/5x-lampada-dicroica-led-65w-branco-quente-3000k-mr16-gu10-luz-branco-quente/p/MLB52692635?pdp_filters=seller_id%3A206375372#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=1&type=product&tracking_id=d6d283af-71d5-404d-8058-bd677838071a&wid=MLB4709291375&sid=search',
                    badge: 'Frete grátis'
                },
                {
                    name: 'Kit 4 Bases de Teto para Lustre Pendente Dourado',
                    marketplace: 'mercadoLivre',
                    image: 'assets/produtos/4base.webp',
                    url: 'https://www.mercadolivre.com.br/kit-4-base-teto-canopla-p-lustre-pendente-dourado/p/MLB44577064?pdp_filters=seller_id%3A206375372#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=6&type=product&tracking_id=8e78b79b-9f66-4a8e-88f5-32dffcc1b20f&wid=MLB6722313878&sid=search',
                    badge: ''
                },
                {
                    name: 'Kit 3 Pendentes Tubo 30cm Dourado LED com Fio de Cristal',
                    marketplace: 'mercadoLivre',
                    image: 'assets/produtos/3pendentes.webp',
                    url: 'https://www.mercadolivre.com.br/3-pendentes-tubo-30cm-dourado-led-fio-cristal/p/MLB50012699?pdp_filters=seller_id%3A206375372#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=7&type=product&tracking_id=7e6d9cc9-0a94-4613-a90b-dc42daf899fe&wid=MLB6147654278&sid=search',
                    badge: ''
                },
                {
                    name: 'Kit 3 Pendentes para Balcão Gourmet Ilha LED Âmbar Retrô',
                    marketplace: 'mercadoLivre',
                    image: 'assets/produtos/pendentebalcao.webp',
                    url: 'https://www.mercadolivre.com.br/kit-3-pendente-para-balcao-gourmet-ilha--led-ambar-retro/up/MLBU5121152496?pdp_filters=seller_id%3A206375372#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=18&type=product&tracking_id=93faa7ed-78b6-4ccb-8ede-cdf7e8f6d957&wid=MLB5191843089&sid=search',
                    badge: ''
                },
                {
                    name: 'Canopla de Teto Redonda 45cm para 4 Pendentes',
                    marketplace: 'mercadoLivre',
                    image: 'assets/produtos/canoplamarela.webp',
                    url: 'https://www.mercadolivre.com.br/canopla-teto-grande-redonda-45cm-para-4-pendentes-lustre/up/MLBU3855714273?pdp_filters=seller_id%3A206375372#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=40&type=product&tracking_id=7813e052-3043-45f1-b2bd-fe983591c85a&wid=MLB4555406837&sid=search',
                    badge: ''
                },
                {
                    name: 'Kit 3 Pendentes Dourado Escovado com Bocal E27',
                    marketplace: 'mercadoLivre',
                    image: 'assets/produtos/3dourado.webp',
                    url: 'https://www.mercadolivre.com.br/kit-3-pendente-dourado-escovado--canopla--fio--bocal-e27/up/MLBU3406185354?pdp_filters=seller_id%3A206375372#polycard_client=search-desktop&be_origin=backend&overlay_label=not_apply&search_layout=grid&position=14&type=product&tracking_id=e245c24f-229c-42cd-91b5-c0cd27a38fb6&wid=MLB4190780911&sid=search',
                    badge: 'Oferta'
                }
            ]
        },
        destaques: {
            moreMarketplace: 'shopee',
            products: [
                {
                    name: 'Kit 3 Pendentes Tubo Fokus 30cm Preto com LED 3000K',
                    marketplace: 'shopee',
                    image: 'assets/produtos/3pendentespreto.webp',
                    url: 'https://shopee.com.br/Kit-3-Pendente-Tubo-Lustre-Fokus-30cm-Preto-Led-incluso-3000k-i.388202211.23507661314?extraParams=%7B%22display_model_id%22%3A213340575285%2C%22model_selection_logic%22%3A3%7D',
                    badge: ''
                },
                {
                    name: 'Luminária Retrô Arandela Camarim com Botão',
                    marketplace: 'shopee',
                    image: 'assets/produtos/arandelaretro.webp',
                    url: 'https://shopee.com.br/Lumin%C3%A1ria-Retr%C3%B4-Arandela-Camarim-cabeceira-Parede-com-Bot%C3%A3o-Liga-Desliga-i.388202211.23424727626?extraParams=%7B%22display_model_id%22%3A220969237474%2C%22model_selection_logic%22%3A3%7D',
                    badge: ''
                },
                {
                    name: 'Canopla de Teto Dourado Champanhe Quadrada 20x20cm',
                    marketplace: 'shopee',
                    image: 'assets/produtos/canoplaquadrada.webp',
                    url: 'https://shopee.com.br/Canopla-de-Teto-Dourado-Champanhe-Quadrada-20x20cm-para-2-Pendentes-Lustre-i.388202211.23893498391?extraParams=%7B%22display_model_id%22%3A179717597684%2C%22model_selection_logic%22%3A3%7D',
                    badge: ''
                },
                {
                    name: 'Kit 4 Plafons Spot Preto Grande 17x17cm',
                    marketplace: 'shopee',
                    image: 'assets/produtos/4plafon.webp',
                    url: 'https://shopee.com.br/4x-Plafon-Spot-Preto-Grande-17x17cm-Sobrepor-Teto-Laje-Gesso-i.388202211.58217402599?extraParams=%7B%22display_model_id%22%3A149794776751%2C%22model_selection_logic%22%3A3%7D',
                    badge: ''
                },
                {
                    name: 'Spot Balizador para Embutir no Chão, Piso ou Jardim',
                    marketplace: 'shopee',
                    image: 'assets/produtos/spotchao.webp',
                    url: 'https://shopee.com.br/Spot-Balizador-Lumin%C3%A1ria-Embutir-Ch%C3%A3o-Piso-Jardim-Quintal-MR16-GU10-i.388202211.22992822751?extraParams=%7B%22display_model_id%22%3A238763651083%2C%22model_selection_logic%22%3A3%7D',
                    badge: ''
                },
                {
                    name: 'Kit 5 Canoplas de Teto 12cm Dourado Escovado',
                    marketplace: 'shopee',
                    image: 'assets/produtos/5canopla.webp',
                    url: 'https://shopee.com.br/Kit-5-Canopla-de-Teto-12cm-para-Pendente-Lustre-Dourado-escovado-i.388202211.22993244875?extraParams=%7B%22display_model_id%22%3A139646478927%2C%22model_selection_logic%22%3A3%7D',
                    badge: ''
                }
            ]
        }
    };

    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const shelf = carousel.dataset.carousel;
        const section = productCatalog[shelf];
        carousel.innerHTML = section.products.map(product => {
            const url = product.url || marketplaceLinks[product.marketplace];
            const marketplaceName = product.marketplace === 'shopee' ? 'Shopee' : 'Mercado Livre';
            return `<a class="product-card" href="${url}" target="_blank" rel="noopener noreferrer">
                ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
                <img class="product-card-image" src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-card-body"><span class="product-card-market">Disponível no ${marketplaceName}</span><p class="product-card-name">${product.name}</p><span class="product-card-link">Ver produto <span aria-hidden="true">→</span></span></div>
            </a>`;
        }).join('');
        document.querySelector(`[data-more-products="${shelf}"]`).href = marketplaceLinks[section.moreMarketplace];
    });

    document.querySelectorAll('[data-carousel-prev], [data-carousel-next]').forEach(button => {
        button.addEventListener('click', () => {
            const carousel = document.querySelector(`[data-carousel="${button.dataset.carouselPrev || button.dataset.carouselNext}"]`);
            carousel.scrollBy({ left: button.dataset.carouselPrev ? -carousel.clientWidth * 0.8 : carousel.clientWidth * 0.8, behavior: 'smooth' });
        });
    });

    // Rolagem contínua e sincronizada: os cards duplicados tornam o retorno ao início imperceptível.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const carousels = [...document.querySelectorAll('[data-carousel]')];
        const pausedCarousels = new Set();
        carousels.forEach(carousel => {
            const originalCards = [...carousel.children];
            originalCards.forEach(card => {
                const copy = card.cloneNode(true);
                copy.setAttribute('aria-hidden', 'true');
                copy.tabIndex = -1;
                carousel.append(copy);
            });
            carousel.dataset.loopPoint = carousel.children[originalCards.length].offsetLeft - carousel.children[0].offsetLeft;
            carousel.style.scrollBehavior = 'auto';
        });

        let previousTime = 0;
        const speed = 38; // pixels por segundo
        const animateCarousels = time => {
            const elapsed = previousTime ? time - previousTime : 0;
            previousTime = time;
            if (pausedCarousels.size === 0) {
                carousels.forEach(carousel => {
                    const loopPoint = Number(carousel.dataset.loopPoint);
                    carousel.scrollLeft += speed * elapsed / 1000;
                    if (carousel.scrollLeft >= loopPoint) carousel.scrollLeft -= loopPoint;
                });
            }
            window.requestAnimationFrame(animateCarousels);
        };
        window.requestAnimationFrame(animateCarousels);

        carousels.forEach(carousel => {
            carousel.addEventListener('pointerenter', () => pausedCarousels.add(carousel));
            carousel.addEventListener('pointerleave', () => pausedCarousels.delete(carousel));
            carousel.addEventListener('focusin', () => pausedCarousels.add(carousel));
            carousel.addEventListener('focusout', () => pausedCarousels.delete(carousel));
        });
    }

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
