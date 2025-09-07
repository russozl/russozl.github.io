// 🚀 RX-7 FC - Funcionalidades Criativas
document.addEventListener('DOMContentLoaded', function() {
    
    // 🎮 1. LOADING SCREEN COM MOTOR ROTATIVO
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 3000);
    
    // 🎯 2. CURSOR PERSONALIZADO COM RASTRO DE FUMO
    let trailElements = [];
    document.addEventListener('mousemove', function(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        trailElements.push(trail);
        if (trailElements.length > 10) {
            const oldTrail = trailElements.shift();
            oldTrail.remove();
        }
    });
    
    // 🏁 3. VELOCÍMETRO ANIMADO
    const speedometer = document.querySelector('.speedometer');
    if (speedometer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.speedometer-fill');
                    const needle = entry.target.querySelector('.speedometer-needle');
                    
                    setTimeout(() => {
                        fill.style.clipPath = 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)';
                        needle.style.transform = 'translate(-50%, -100%) rotate(90deg)';
                    }, 500);
                }
            });
        });
        observer.observe(speedometer);
    }
    
    // 🌙 4. MODO NOTURNO AUTOMÁTICO
    const hour = new Date().getHours();
    if (hour >= 18 || hour <= 6) {
        document.body.classList.add('night-mode');
    }
    
    // 🎵 5. KONAMI CODE EASTER EGG
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            document.body.classList.add('konami-active');
            
            // Som de motor (Web Audio API)
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
            
            setTimeout(() => document.body.classList.remove('konami-active'), 2000);
            konamiCode = [];
        }
    });
    
    // 📱 6. NAVEGAÇÃO POR GESTOS (SWIPE)
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - próxima seção
                scrollToNextSection();
            } else {
                // Swipe right - seção anterior
                scrollToPrevSection();
            }
        }
        
        startX = 0;
        startY = 0;
    });
    
    // 🎨 7. PARALLAX EFFECT NAS IMAGENS
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gallery-item img');
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.3 + (index * 20);
            element.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // 🔄 8. SMOOTH SCROLLING E NAVEGAÇÃO
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 📊 9. CONTADOR DE VISITAS SIMPLES
    let visitCount = localStorage.getItem('rx7-visits') || 0;
    visitCount++;
    localStorage.setItem('rx7-visits', visitCount);
    
    // 🎯 10. ANIMAÇÕES DE ENTRADA
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.spec-card, .gallery-item, .gallery-item-simple, .text-content, .mx3-text, .gallery-description');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 🎨 11. HIGHLIGHT DA SEÇÃO ATIVA
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // 🎯 FUNÇÕES AUXILIARES
    function scrollToNextSection() {
        const sections = document.querySelectorAll('.section');
        const currentScroll = window.pageYOffset;
        
        for (let section of sections) {
            if (section.offsetTop > currentScroll + 100) {
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
                break;
            }
        }
    }
    
    function scrollToPrevSection() {
        const sections = Array.from(document.querySelectorAll('.section')).reverse();
        const currentScroll = window.pageYOffset;
        
        for (let section of sections) {
            if (section.offsetTop < currentScroll - 100) {
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
                break;
            }
        }
    }
    
    // 🎨 CSS DINÂMICO
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #e74c3c !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🏁 RX-7 FC carregado com sucesso!');
    console.log('🎮 Konami Code: ↑↑↓↓←→←→BA');
    console.log('📱 Swipe para navegar');
    console.log('🌙 Modo noturno automático');
});
