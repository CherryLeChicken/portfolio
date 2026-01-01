document.addEventListener("DOMContentLoaded", function () {
    // Lightbox Logic - Dynamic Injection
    function initLightbox() {
        // Create lightbox elements if they don't exist
        let lightbox = document.getElementById("lightbox");
        if (!lightbox) {
            lightbox = document.createElement("div");
            lightbox.id = "lightbox";
            lightbox.innerHTML = `
                <div class="lightbox-controls">
                    <button class="lightbox-btn zoom-btn" title="Toggle Zoom"><i class="fas fa-search-plus"></i></button>
                    <button class="lightbox-btn close-lightbox" title="Close"><i class="fas fa-times"></i></button>
                </div>
                <div class="lightbox-content-wrapper">
                    <div class="lightbox-content">
                        <img id="lightbox-img" src="" alt="Enlarged view">
                        <div id="lightbox-caption"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(lightbox);
        }

        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxCaption = document.getElementById("lightbox-caption");
        const closeBtn = lightbox.querySelector(".close-lightbox");
        const zoomBtn = lightbox.querySelector(".zoom-btn");
        const contentWrapper = lightbox.querySelector(".lightbox-content-wrapper");
        const zoomIcon = zoomBtn.querySelector("i");

        // Add click event to all gallery images in the project
        const images = document.querySelectorAll(".gallery-img");
        
        images.forEach(img => {
            img.style.cursor = "zoom-in";
            img.addEventListener("click", function () {
                lightbox.classList.add("active");
                lightboxImg.src = this.src;
                lightboxCaption.textContent = this.alt || "";
                document.body.style.overflow = "hidden"; // Prevent scrolling
                
                // Reset zoom state when opening new image
                contentWrapper.classList.remove("zoomed");
                zoomIcon.className = "fas fa-search-plus";
            });
        });

        // Toggle Zoom Logic
        const toggleZoom = () => {
            contentWrapper.classList.toggle("zoomed");
            if (contentWrapper.classList.contains("zoomed")) {
                zoomIcon.className = "fas fa-search-minus";
                lightboxImg.style.cursor = "zoom-out";
            } else {
                zoomIcon.className = "fas fa-search-plus";
                lightboxImg.style.cursor = "zoom-in";
            }
        };

        zoomBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleZoom();
        });

        lightboxImg.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleZoom();
        });

        // Close logic
        const closeLightbox = () => {
            lightbox.classList.remove("active");
            contentWrapper.classList.remove("zoomed");
            zoomIcon.className = "fas fa-search-plus";
            document.body.style.overflow = ""; // Restore scrolling
        };

        closeBtn.addEventListener("click", closeLightbox);
        
        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox || e.target === contentWrapper) {
                closeLightbox();
            }
        });

        // Keyboard support
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && lightbox.classList.contains("active")) {
                closeLightbox();
            }
            if (e.key === "z" && lightbox.classList.contains("active")) {
                toggleZoom();
            }
        });
    }

    initLightbox();

    // Scrollable Reel Gallery Logic
    const container = document.getElementById('ui-gallery-container');
    const pagination = document.getElementById('ui-gallery-pagination');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (container && pagination) {
        const reelImages = container.querySelectorAll('.gallery-img');
        
        // Clear existing pagination
        pagination.innerHTML = '';
        
        // Create pagination dots
        reelImages.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = 'gallery-dot' + (idx === 0 ? ' active' : '');
            pagination.appendChild(dot);
        });

        const dots = pagination.querySelectorAll('.gallery-dot');

        // Update active dot on scroll
        container.addEventListener('scroll', () => {
            const containerCenter = container.scrollLeft + (container.offsetWidth / 2);
            let closestIdx = 0;
            let minDistance = Infinity;

            reelImages.forEach((img, idx) => {
                const imgCenter = img.offsetLeft - container.offsetLeft + (img.offsetWidth / 2);
                const distance = Math.abs(containerCenter - imgCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIdx = idx;
                }
            });
            
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === closestIdx);
            });
        });

        // Dot clicking
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                const img = reelImages[idx];
                const scrollAmount = img.offsetLeft - container.offsetLeft - (container.offsetWidth / 2) + (img.offsetWidth / 2);
                container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            });
        });

        // Arrow navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                container.scrollBy({ left: -container.offsetWidth / 2, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                container.scrollBy({ left: container.offsetWidth / 2, behavior: 'smooth' });
            });
        }
    }
});
