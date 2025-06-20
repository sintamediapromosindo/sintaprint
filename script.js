
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check if user previously selected dark mode
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save user preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Carousel functionality
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let interval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and indicator
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentIndex = index;
    }

    // Navigate to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }

    // Navigate to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    }

    // Start automatic slideshow
    function startSlideshow() {
        interval = setInterval(nextSlide, 5000);
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(interval);
    }

    // Event listeners for carousel controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopSlideshow();
            startSlideshow();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopSlideshow();
            startSlideshow();
        });
    }

    // Event listeners for carousel indicators
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    // Start the slideshow
    startSlideshow();

    // Active navigation on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // For demo only: Show message received alert
            alert(`Pesan dari ${name} telah diterima! Kami akan menghubungi Anda secepatnya.`);
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('Form Data:', { name, email, phone, message });
        });
    }

    // Image loading animation
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            img.classList.add('loaded');
        });
    });

    // Product card hover effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.product-info').style.transform = 'translateY(5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.product-info').style.transform = 'translateY(0)';
        });
    });

    // Prevent empty form submissions
    const allForms = document.querySelectorAll('form');
    
    allForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Mohon isi semua kolom yang diperlukan.');
            }
        });
    });

    // Check if price list table is scrollable on mobile
    function checkTableScroll() {
        const priceTableContainer = document.querySelector('.price-table-container');
        const scrollIndicator = document.querySelector('.price-scroll-indicator');
        
        if (priceTableContainer && scrollIndicator && window.innerWidth <= 768) {
            if (priceTableContainer.scrollWidth > priceTableContainer.clientWidth) {
                scrollIndicator.style.display = 'flex';
                
                // Hide indicator after user has started scrolling
                priceTableContainer.addEventListener('scroll', function() {
                    if (this.scrollLeft > 20) {
                        scrollIndicator.style.opacity = '0';
                        setTimeout(() => {
                            scrollIndicator.style.display = 'none';
                        }, 500);
                    }
                }, { once: true });
            } else {
                scrollIndicator.style.display = 'none';
            }
        } else if (scrollIndicator) {
            scrollIndicator.style.display = 'none';
        }
    }
    
    // Run on load and resize
    checkTableScroll();
    window.addEventListener('resize', checkTableScroll);

    // Scroll to top button (will be added dynamically)
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn shine-effect';
    document.body.appendChild(scrollBtn);

    // Apply styles to the scroll button
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '20px';
    scrollBtn.style.right = '20px';
    scrollBtn.style.width = '40px';
    scrollBtn.style.height = '40px';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.backgroundColor = 'var(--primary-color)';
    scrollBtn.style.color = 'white';
    scrollBtn.style.border = 'none';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.display = 'none';
    scrollBtn.style.alignItems = 'center';
    scrollBtn.style.justifyContent = 'center';
    scrollBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    scrollBtn.style.zIndex = '999';
    scrollBtn.style.transition = 'all 0.3s ease-in-out';

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    // Scroll to top when button is clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});