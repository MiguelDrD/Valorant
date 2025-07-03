

// 1. Smooth Scrolling para navegação interna
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// 2. Animação de fade-in para elementos quando entram na viewport
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar todos os elementos com a classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// 3. Tooltip para informações adicionais
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    element.addEventListener('mouseenter', (e) => {
        tooltip.style.display = 'block';
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });

    element.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    element.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY + 10 + 'px';
    });
}

// 4. Sistema de busca simples
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;

    const content = document.querySelectorAll('.content h2, .content h3, .content p');
    const searchData = Array.from(content).map(el => ({
        text: el.textContent,
        element: el
    }));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchResults.innerHTML = '';

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = searchData.filter(item => 
            item.text.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matches.length > 0) {
            searchResults.style.display = 'block';
            matches.forEach(match => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.textContent = match.text.substring(0, 100) + '...';
                resultItem.addEventListener('click', () => {
                    match.element.scrollIntoView({ behavior: 'smooth' });
                    searchResults.style.display = 'none';
                    searchInput.value = '';
                });
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.style.display = 'none';
        }
    });
}

// 5. Dark/Light mode toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

        function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'bx  bx-moon';
        } else {
            themeIcon.className = 'bx  bxs-sun';
        }
    }
}


// 6. Contador de progresso de leitura
function setupReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 7. Botão "Voltar ao topo"
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. Animação de typing para títulos
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 9. Modal para imagens
function setupImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.modal-image');
    const closeBtn = modal.querySelector('.close-modal');

    document.querySelectorAll('.content img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 10. Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    observeElements();
    setupSearch();
    setupThemeToggle();
    setupReadingProgress();
    setupBackToTop();
    setupImageModal();

    // Adicionar classes de animação aos elementos
    document.querySelectorAll('.content h2, .content h3, .content p, .content ul').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Efeito de typing no título principal (apenas na página inicial)
    const mainTitle = document.querySelector('.title h1');
    if (mainTitle && mainTitle.textContent === 'Seja um Radiante') {
        typeWriter(mainTitle, 'Seja um Radiante', 150);
    }

    // Adicionar tooltips para elementos específicos
    document.querySelectorAll('.pags').forEach(btn => {
        const tooltipText = `Clique para acessar a seção ${btn.textContent}`;
        createTooltip(btn, tooltipText);
    });
});

// 11. Função para destacar texto de busca
function highlightSearchTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// 12. Sistema de favoritos (usando localStorage)
function setupFavorites() {
    const favoriteBtn = document.getElementById('favorite-btn');
    if (!favoriteBtn) return;

    const pageTitle = document.title;
    const favorites = JSON.parse(localStorage.getItem('valorant-favorites') || '[]');

    // Verificar se a página atual está nos favoritos
    const isFavorite = favorites.includes(pageTitle);
    favoriteBtn.textContent = isFavorite ? '★' : '☆';

    favoriteBtn.addEventListener('click', () => {
        let updatedFavorites = [...favorites];
        
        if (isFavorite) {
            updatedFavorites = updatedFavorites.filter(fav => fav !== pageTitle);
            favoriteBtn.textContent = '☆';
        } else {
            updatedFavorites.push(pageTitle);
            favoriteBtn.textContent = '★';
        }
        
        localStorage.setItem('valorant-favorites', JSON.stringify(updatedFavorites));
    });
}

// 13. Função para copiar link da seção
function setupCopyLink() {
    document.querySelectorAll('.content h2, .content h3').forEach(heading => {
        heading.style.position = 'relative';
        heading.style.cursor = 'pointer';
        
        heading.addEventListener('click', () => {
            const url = window.location.href.split('#')[0] + '#' + heading.id;
            navigator.clipboard.writeText(url).then(() => {
                // Mostrar feedback visual
                const feedback = document.createElement('span');
                feedback.textContent = 'Link copiado!';
                feedback.style.position = 'absolute';
                feedback.style.right = '0';
                feedback.style.top = '0';
                feedback.style.background = '#00f0ff';
                feedback.style.color = '#000';
                feedback.style.padding = '2px 8px';
                feedback.style.borderRadius = '3px';
                feedback.style.fontSize = '12px';
                heading.appendChild(feedback);
                
                setTimeout(() => {
                    feedback.remove();
                }, 2000);
            });
        });
    });
}

// Exportar funções para uso global
window.ValorantSite = {
    smoothScroll,
    typeWriter,
    highlightSearchTerm,
    setupFavorites,
    setupCopyLink
};

