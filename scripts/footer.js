// Load footer into any element with id="footer-container"
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('./footer.html')
            .then(response => response.text())
            .then(data => footerContainer.innerHTML = data);
    }
}); 