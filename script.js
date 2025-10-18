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


    // --- Fade-in Animation on Scroll --- (ITO YUNG ORIGINAL AT TAMA)
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOptions = { // DITO NAKA-DEFINE YUNG appearOptions
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions); // GINAMIT DITO NANG TAMA

        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    // --- WALA NA YUNG DUPLICATE BLOCK DITO ---


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
    }); // <-- DAPAT MAY CLOSING BRACKET DITO ANG keydown listener


    // --- In-Progress Notice Modal Logic ---
    const noticeOverlay = document.getElementById('devNoticeOverlay');
    const modalContent = noticeOverlay ? noticeOverlay.querySelector('.modal-content') : null;
    const closeNoticeModalButton = document.getElementById('closeNoticeModalBtn');
    const firstFocusableElement = closeNoticeModalButton; // The button is likely the only focusable element
    const lastFocusableElement = closeNoticeModalButton; // Same as above

    if (noticeOverlay && modalContent && closeNoticeModalButton) {
        // Function to open the modal
        const openModal = () => {
            noticeOverlay.classList.remove('hidden');
            document.body.classList.add('no-scroll'); // Prevent background scroll
            closeNoticeModalButton.focus(); // Set focus to the close button
        };

        // Function to close the modal
        const closeModal = () => {
            noticeOverlay.classList.add('hidden');
            document.body.classList.remove('no-scroll'); // Allow background scroll again
            localStorage.setItem('devNoticeClosed', 'true');
        };

        // Show the modal only if it hasn't been closed before
        if (localStorage.getItem('devNoticeClosed') !== 'true') {
            // Use setTimeout to allow CSS transitions to apply correctly on load
            setTimeout(openModal, 100); 
        }

        // Event listener for the close button
        closeNoticeModalButton.addEventListener('click', closeModal);

        // Event listener to close when clicking the overlay
        noticeOverlay.addEventListener('click', (e) => {
            if (e.target === noticeOverlay) {
                closeModal();
            }
        });

        // Event listener for closing with the Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !noticeOverlay.classList.contains('hidden')) {
                closeModal();
            }
        });

        // Basic focus trapping (optional but recommended for accessibility)
        // This keeps the Tab key within the modal
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || noticeOverlay.classList.contains('hidden')) {
                return;
            }

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }
}); // <--- DAPAT ISA LANG ANG CLOSING BRACKET AT SEMICOLON DITO para sa DOMContentLoaded

