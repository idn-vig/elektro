/* ========================================
   ELEKTROFIX - Premium JavaScript
   Ultra Modern Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Preloader
    // ========================================
    const preloader = document.getElementById('preloader');
    
    function hidePreloader() {
        preloader.classList.add('hidden');
    }
    
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
        setTimeout(hidePreloader, 2000);
    }

    // ========================================
    // Custom Cursor
    // ========================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Hover effect on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .service-card, .feature-card, .testimonial-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
        });
    }

    // ========================================
    // Hero Particles
    // ========================================
    const heroParticles = document.getElementById('heroParticles');
    
    if (heroParticles) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            `;
            heroParticles.appendChild(particle);
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavScroll);

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // ========================================
    // Theme Toggle
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('elektrofix-theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('elektrofix-theme', newTheme);
    });

    // ========================================
    // Active Navigation Highlight
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);

    // ========================================
    // Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
    }
    
    const heroSection = document.querySelector('.hero');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    if (heroSection) {
        counterObserver.observe(heroSection);
    }

    // ========================================
    // Initialize AOS (Animate on Scroll)
    // ========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            disable: 'mobile'
        });
    }

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // WhatsApp message format
            const waMessage = `*Pertanyaan Baru dari Website Elektro Fix*%0A%0A` +
                `*Nama:* ${name}%0A` +
                `*No. Tel:* ${phone}%0A` +
                `*Email:* ${email}%0A` +
                `*Perkhidmatan:* ${service}%0A` +
                `*Mesej:* ${message}`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/60189121055?text=${waMessage}`, '_blank');
            
            // Show success notification
            showNotification('Mesej berjaya dihantar! Kami akan menghubungi anda segera.', 'success');
            
            contactForm.reset();
        });
    }

    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 18px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : '#1a1a2e'};
            color: #fff;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
            z-index: 10000;
            animation: slideInRight 0.4s ease;
            font-family: 'Poppins', sans-serif;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #fff;
            cursor: pointer;
            padding: 5px;
            margin-left: 10px;
            opacity: 0.8;
        `;
        
        const removeNotification = () => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        };
        
        closeBtn.addEventListener('click', removeNotification);
        setTimeout(removeNotification, 5000);
    }

    // ========================================
    // Service Cards Tilt Effect
    // ========================================
    const tiltCards = document.querySelectorAll('.service-card, .feature-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 992) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // WhatsApp Float Animation
    // ========================================
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    if (whatsappFloat) {
        setInterval(() => {
            whatsappFloat.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                whatsappFloat.style.animation = '';
            }, 500);
        }, 5000);
    }

    // ========================================
    // Console Branding
    // ========================================
    console.log('%câš?Elektro Fix Enterprise', 'font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cPusat Baikpulih Telefon Bimbit, Laptop & PC | Machang, Kelantan', 'font-size: 14px; color: #8b5cf6;');
    console.log('%cÂ© 2025 Elektro Fix Enterprise. Hak Cipta Terpelihara.', 'font-size: 12px; color: #888;');

});
