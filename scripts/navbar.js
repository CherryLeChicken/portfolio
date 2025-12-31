function initializeNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navRight) {
        // Remove existing listener to prevent doubles
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);

        newHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            newHamburger.classList.toggle('active');
            navRight.classList.toggle('show');
            document.body.style.overflow = navRight.classList.contains('show') ? 'hidden' : 'auto';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navRight.classList.contains('show') && !navRight.contains(e.target) && !newHamburger.contains(e.target)) {
                newHamburger.classList.remove('active');
                navRight.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const activeHamburger = document.querySelector('.hamburger');
                if (activeHamburger) activeHamburger.classList.remove('active');
                if (navRight) navRight.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Handle Navbar scroll effect
window.addEventListener('scroll', () => {
    const topnav = document.querySelector('.topnav');
    if (topnav) {
        if (window.scrollY > 50) {
            topnav.classList.add('scrolled');
        } else {
            topnav.classList.remove('scrolled');
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeNavbar);

// Re-initialize if navbar is loaded dynamically
const navbarContainer = document.getElementById('navbar');
if (navbarContainer) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                initializeNavbar();
            }
        });
    });
    observer.observe(navbarContainer, { childList: true });
}
