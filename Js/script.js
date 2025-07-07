document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- Mobile Nav Toggle ---
    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('active');

        // Hamburger Animation
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    AOS.init({
        duration: 1000, 
        once: true,
    });
});

// Check if we are on a page with a gallery
if (document.querySelector('.masonry-grid')) {
    const galleryItems = document.querySelectorAll('.photo-item');
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxPrev = document.getElementById('lightbox-prev');
    
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const imgSrc = galleryItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    // Close lightbox by clicking on the background overlay
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
}