// Simple script to handle smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    
    // Select all links that have hashes
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevent default anchor click behavior
            e.preventDefault();

            // Store hash
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional: Add form submission confirmation alert 
    // (Note: formsubmit.co will redirect anyway based on your hidden _next field)
    const form = document.querySelector('.styled-form');
    if(form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('.submit-btn');
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
        });
    }
});
