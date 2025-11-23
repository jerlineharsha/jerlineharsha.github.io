// ============================================
// Profile Photo Upload
// ============================================
const photoUpload = document.getElementById('photo-upload');
const profilePhoto = document.getElementById('profile-photo');

if (photoUpload && profilePhoto) {
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePhoto.src = e.target.result;
                // Save to localStorage for persistence
                localStorage.setItem('profilePhoto', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Load saved photo from localStorage, or use placeholder
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profilePhoto.src = savedPhoto;
    } else {
        // Use placeholder SVG if no saved photo
        profilePhoto.src = 'assets/profile-photo-placeholder.svg';
    }
}

// ============================================
// Resume Upload & Preview
// ============================================
const resumeUpload = document.getElementById('resume-upload');
const resumePreview = document.getElementById('resume-preview');
const resumeDownload = document.getElementById('resume-download');

if (resumeUpload && resumePreview) {
    resumeUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Create iframe for PDF preview
                const iframe = document.createElement('iframe');
                iframe.src = e.target.result;
                iframe.style.width = '100%';
                iframe.style.height = '600px';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '8px';
                
                resumePreview.innerHTML = '';
                resumePreview.appendChild(iframe);
                
                // Show download button
                if (resumeDownload) {
                    resumeDownload.style.display = 'inline-flex';
                    resumeDownload.href = e.target.result;
                    resumeDownload.download = file.name;
                }
                
                // Save to localStorage
                localStorage.setItem('resumeData', e.target.result);
                localStorage.setItem('resumeFileName', file.name);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a PDF file.');
        }
    });
    
    // Load saved resume from localStorage
    const savedResume = localStorage.getItem('resumeData');
    const savedFileName = localStorage.getItem('resumeFileName');
    if (savedResume) {
        const iframe = document.createElement('iframe');
        iframe.src = savedResume;
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        
        resumePreview.innerHTML = '';
        resumePreview.appendChild(iframe);
        
        if (resumeDownload && savedFileName) {
            resumeDownload.style.display = 'inline-flex';
            resumeDownload.href = savedResume;
            resumeDownload.download = savedFileName;
        }
    }
}

// ============================================
// Skill Progress Bars Animation
// ============================================
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progressFill = progressBar.querySelector('.progress-fill');
                const progressPercent = progressBar.parentElement.querySelector('.progress-percent');
                const progress = parseInt(progressBar.getAttribute('data-progress'));
                
                if (progressFill && !progressBar.classList.contains('animated')) {
                    progressBar.classList.add('animated');
                    progressFill.style.width = progress + '%';
                    
                    // Animate percentage counter
                    let current = 0;
                    const increment = progress / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= progress) {
                            current = progress;
                            clearInterval(timer);
                        }
                        if (progressPercent) {
                            progressPercent.textContent = Math.round(current) + '%';
                        }
                    }, 20);
                }
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
};

// ============================================
// Mobile Navigation Toggle
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ============================================
// Smooth Scroll for Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
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

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.about-card, .education-card, .project-card, .certificate-card, .participation-card, .contact-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Initialize progress bars animation
    animateProgressBars();
});

// ============================================
// Card Hover Effects Enhancement
// ============================================
const cards = document.querySelectorAll('.education-card, .project-card, .certificate-card, .participation-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// Parallax Effect for Hero Background
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background-glow');
    
    if (heroBackground) {
        heroBackground.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
    }
});

// ============================================
// Error Handling for Images
// ============================================
if (profilePhoto) {
    profilePhoto.addEventListener('error', function() {
        // Create a placeholder if image fails to load
        this.style.display = 'none';
        const container = this.parentElement;
        if (container && !container.querySelector('.photo-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'photo-placeholder';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #E6D6FF 0%, #D4B8FF 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #2D2D2D;
                font-weight: 600;
                font-size: 3rem;
            `;
            placeholder.textContent = 'JH';
            container.appendChild(placeholder);
        }
    });
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c👋 Welcome to Jerline Harsha S Portfolio!', 'font-size: 20px; font-weight: bold; color: #E6D6FF;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #666;');
console.log('%cLight Elegant Theme with Pastel Colors', 'font-size: 12px; color: #999;');
