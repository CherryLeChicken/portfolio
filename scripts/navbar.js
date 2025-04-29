function toggleNav() {
    var nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.topnav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', initializeNavbar);

const navbarContainer = document.getElementById('navbar');
if (navbarContainer) {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initializeNavbar();
            }
        });
    });

    observer.observe(navbarContainer, { childList: true });
}

// Add click event listeners to all navbar links
document.querySelectorAll('.nav-right a, .dropdown-content a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('navLinks').classList.remove('show');
            document.querySelector('.hamburger').classList.remove('active');
        }
    });
});