document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburger && mobileMenu && navOverlay) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };

        hamburger.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }


    // --- Typed Text Animation ---
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan) {
        const textArray = ["Web Developer", "Front-End Specialist", "UI/UX Enthusiast"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        setTimeout(type, newTextDelay + 250);
    }


    // --- Aurora Card Glow Effect ---
    document.querySelectorAll('.card-glow').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    // --- Scroll-to-Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }


    // --- Infinite Horizontal Scroll ---
    const scrollList = document.querySelector('.scroll-list');
    if (scrollList) {
        const content = Array.from(scrollList.children);
        content.forEach(item => {
            const duplicate = item.cloneNode(true);
            duplicate.setAttribute('aria-hidden', true);
            scrollList.appendChild(duplicate);
        });
    }


    

    // --- Fade-in Animation on Scroll ---
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    

    // Ito yung code para sa Fade-in Animation on Scroll//
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => appearOnScroll.observe(fader));
    
    
    // --- Disable Copy, Paste, and Right-Click ---

    // 1. Disable Right-Click Menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // 2. Disable Keyboard Shortcuts (Ctrl+C, Ctrl+X, Ctrl+U)
    document.addEventListener('keydown', (e) => {
        // Check for Ctrl key press
        if (e.ctrlKey) {
            // Check for 'c', 'x', 'u' keys
            if (e.key === 'c' || e.key === 'x' || e.key === 'u') {
                e.preventDefault();
            }
        }
    
        // --- In-Progress Notice Modal Logic ---
    const noticeOverlay = document.getElementById('devNoticeOverlay');
    const closeNoticeModalButton = document.getElementById('closeNoticeModalBtn');

    if (noticeOverlay && closeNoticeModalButton) {
        // Function to close the modal
        const closeModal = () => {
            noticeOverlay.classList.add('hidden');
            localStorage.setItem('devNoticeClosed', 'true');
        };

        // Show the modal only if it hasn't been closed before
        if (localStorage.getItem('devNoticeClosed') !== 'true') {
            noticeOverlay.classList.remove('hidden');
        }

        // Event listener for the close button
        closeNoticeModalButton.addEventListener('click', closeModal);

        // Event listener to close when clicking the overlay (outside the content)
        noticeOverlay.addEventListener('click', (e) => {
            if (e.target === noticeOverlay) {
                closeModal();
            }
        });
    }

})});