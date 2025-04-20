function toggleNav() {
    var nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
}

// Add mobile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        dropbtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Only for mobile
                e.preventDefault();
                dropdownContent.classList.toggle('show');
                
                // Toggle the dropdown icon rotation
                const icon = dropbtn.querySelector('::before');
                if (dropdownContent.classList.contains('show')) {
                    dropbtn.style.setProperty('--rotation', '180deg');
                } else {
                    dropbtn.style.setProperty('--rotation', '0deg');
                }
            }
        });
    });
});

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