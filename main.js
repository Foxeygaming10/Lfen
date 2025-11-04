// Navigation Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Animated Statistics Counter
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize stats animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Intersection Observer for scroll-triggered animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        const target = stat.textContent.replace(/,/g, '');
        stat.dataset.target = target;
        stat.textContent = '0';
        observer.observe(stat);
    });
});

// Product Filtering
const searchInput = document.getElementById('product-search');
const categoryFilter = document.getElementById('category-filter');

if (searchInput && categoryFilter) {
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productSpecs = card.querySelector('.product-specs').textContent.toLowerCase();
            const productCategory = card.dataset.category?.toLowerCase() || '';

            const matchesSearch = productName.includes(searchTerm) || productSpecs.includes(searchTerm);
            const matchesCategory = !selectedCategory || selectedCategory === 'all' || productCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Reset previous error states
        [name, email, phone, message].forEach(field => {
            field.style.borderColor = '';
        });
        
        // Validate name
        if (!name.value.trim()) {
            name.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        // Validate phone (optional but if provided, should be valid)
        if (phone.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone.value)) {
                phone.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
        
        // Validate message
        if (!message.value.trim()) {
            message.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (isValid) {
            // Since there's no backend, show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.style.color = 'var(--primary-color)';
        link.style.fontWeight = 'bold';
    }
});

// WhatsApp Inquiry Functionality
document.addEventListener('DOMContentLoaded', () => {
    const inquireButtons = document.querySelectorAll('.inquire-btn');
    
    inquireButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = button.getAttribute('data-product');
            const phoneNumber = '919447305247'; // WhatsApp number without + and spaces
            const message = encodeURIComponent(`Hello, I am interested in ${productName}. I would like to know more about this product.`);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});

