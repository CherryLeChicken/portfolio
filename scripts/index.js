let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        slide.style.opacity = "0";
        if (index === slideIndex) {
            slide.style.opacity = "1";
        }
    });
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides();
});

