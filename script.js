// Navigation Menu Toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all profile sections
document.querySelectorAll('.profile-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Highlight active section in navigation
const sections = document.querySelectorAll('.profile-section');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class style for navigation links
const style = document.createElement('style');
style.textContent = `
    .nav-list a.active {
        background: var(--bg-gradient);
        color: white;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Photo gallery functionality (if photos are added)
const photoGallery = document.getElementById('photoGallery');
if (photoGallery) {
    // Future: Add lightbox functionality for photos
    photoGallery.addEventListener('click', (e) => {
        if (e.target.closest('.photo-placeholder')) {
            // Placeholder for future photo upload/view functionality
            console.log('Photo clicked - ready for implementation');
        }
    });
}

// Form validation helper (for future editable version)
function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff6b9d';
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Print functionality
function printProfile() {
    window.print();
}

// Export to PDF functionality (placeholder for future implementation)
function exportToPDF() {
    // Future: Implement PDF export using a library like jsPDF or html2pdf
    console.log('Export to PDF - ready for implementation');
    alert('פונקציית ייצוא ל-PDF תזמין בקרוב');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key closes navigation menu
    if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
    
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printProfile();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Lazy load images (when photos are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add tooltip functionality
function addTooltip(element, text) {
    element.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.85rem;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        element.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
}

// Initialize tooltips for info items with [למלא]
document.querySelectorAll('.value').forEach(valueEl => {
    if (valueEl.textContent.includes('[למלא]')) {
        addTooltip(valueEl, 'לחץ לעריכה - תכונה זו תהיה זמינה בגרסה עתידית');
    }
});

console.log('💞 HeartMatch - Divine Connection loaded successfully!');

