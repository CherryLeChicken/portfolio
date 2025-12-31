// Load footer into any element with id="footer-container"
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('./footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
                
                // 1. Current Year
                const yearSpan = document.getElementById('current-year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }

                // 2. Back to Top Functionality
                const backToTopBtn = document.getElementById('back-to-top');
                if (backToTopBtn) {
                    backToTopBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    });
                }
            });
    }
}); 
