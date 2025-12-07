// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            const spans = this.querySelectorAll('span');
            
            if (mobileMenu.style.display === 'flex') {
                // Close menu
                mobileMenu.style.display = 'none';
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                menuToggle.style.zIndex = '1001';
            } else {
                // Open menu
                mobileMenu.style.display = 'flex';
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                menuToggle.style.zIndex = '1001';
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const projectForm = document.getElementById('projectForm');
    
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const projectType = document.getElementById('projectType').value;
            const budget = document.getElementById('budget').value;
            const description = document.getElementById('description').value;
            
            // Basic validation
            if (!name || !email || !projectType || !budget || !description) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = projectForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real application, you would send this data to a server
                // For now, we'll show a success message
                showAlert('Thank you! Your project details have been received. We\'ll contact you within 24 hours.', 'success');
                
                // Reset form
                projectForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Alert function
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="alert-close">&times;</button>
        `;
        
        // Add to page
        document.body.appendChild(alert);
        
        // Show alert
        setTimeout(() => {
            alert.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
        
        // Close button
        alert.querySelector('.alert-close').addEventListener('click', function() {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        });
    }
    
    // Add CSS for alerts
    const alertStyle = document.createElement('style');
    alertStyle.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 16px 20px;
            border-radius: var(--radius-md);
            border-left: 4px solid var(--primary);
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 2000;
            max-width: 400px;
            border: 1px solid var(--border);
        }
        
        .custom-alert.success {
            border-left-color: var(--accent);
        }
        
        .custom-alert.error {
            border-left-color: #EF4444;
        }
        
        .custom-alert.show {
            transform: translateX(0);
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .alert-content i {
            font-size: 1.25rem;
        }
        
        .alert-content i.fa-check-circle {
            color: var(--accent);
        }
        
        .alert-content i.fa-exclamation-circle {
            color: #EF4444;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.5rem;
            cursor: pointer;
            line-height: 1;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }
        
        .alert-close:hover {
            color: var(--text-primary);
        }
    `;
    document.head.appendChild(alertStyle);
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .ai-card, .project-card, .process-step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .ai-card, .project-card, .process-step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Code animation effect
    const codeElement = document.querySelector('.code-content code');
    if (codeElement) {
        let codeText = codeElement.textContent;
        codeElement.textContent = '';
        
        let i = 0;
        function typeCode() {
            if (i < codeText.length) {
                codeElement.textContent += codeText.charAt(i);
                i++;
                setTimeout(typeCode, 20);
            }
        }
        
        // Start typing animation when code is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeCode, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(codeElement.parentElement);
    }
    
    // Tech stack hover effect
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Project card image hover effect
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, var(--secondary), var(--primary))';
            this.style.transition = 'background 0.5s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        });
    });
    
    // Initialize animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});