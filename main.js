document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.close-btn');
    const sidebarLoginBtn = document.getElementById('sidebarLoginBtn');
    const loginModal = document.getElementById('loginModal');
    const modalCloseBtn = document.querySelector('.login-modal-close');
    const contactForm = document.getElementById('contact-form');
    const yearElement = document.getElementById('year');
    const navLinks = document.querySelectorAll('.nav-menu a, .sidebar a');

    // Mobile Menu Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('visible');
            document.body.style.overflow = sidebar.classList.contains('visible') ? 'hidden' : '';
        });
    }

    // Close Sidebar
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('visible');
            document.body.style.overflow = '';
        });
    }

    // Login Modal Toggle
    if (sidebarLoginBtn && loginModal) {
        sidebarLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            sidebar.classList.remove('visible');
            document.body.style.overflow = '';
        });
    }

    // Close Modal
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }

    // Close Modal when clicking outside
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById('modalLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this to a server
            console.log('Login attempt with:', { email, password });
            alert('Login functionality would connect to a server in production');
            
            // Reset form and close modal
            this.reset();
            loginModal.classList.remove('active');
        });
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('#name').value.trim(),
                email: this.querySelector('#email').value.trim(),
                message: this.querySelector('#message').value.trim()
            };

            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                alert('Please enter a valid email address');
                return;
            }

            // In a real app, you would send to a server here
            console.log('Form submitted:', formData);
            alert(`Thank you, ${formData.name}! Your message has been sent.`);
            this.reset();
        });
    }

    // Smooth Scrolling for all links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close sidebar if it's open
            if (sidebar.classList.contains('visible')) {
                sidebar.classList.remove('visible');
                document.body.style.overflow = '';
            }
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            }
        });
    });

    // Set current year in footer
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (Math.abs(currentScroll - lastScroll) > 5) {
                header.classList.toggle('header-scrolled', currentScroll > 50);
                lastScroll = currentScroll;
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize
    }
});