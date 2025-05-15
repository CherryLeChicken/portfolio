// Load footer into any element with id="footer-container"
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('./footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
                
                // Add copy email functionality after footer is loaded
                const copyBtn = document.querySelector('.copy-btn');
                if (copyBtn) {
                    copyBtn.addEventListener('click', function() {
                        const email = 'c5ke@uwaterloo.ca';
                        navigator.clipboard.writeText(email).then(() => {
                            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                            setTimeout(() => {
                                this.innerHTML = '<i class="fas fa-copy"></i> Copy Email';
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy email: ', err);
                        });
                    });
                }
            });
    }
}); 