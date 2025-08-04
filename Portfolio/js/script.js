$(document).ready(function() {

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000, // values from 0 to 3000, with step 50ms
        once: true,     // whether animation should happen only once - while scrolling down
    });

    // Initialize Vanta.js Background Animation
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00abf0, // --main-color
        backgroundColor: 0x081b29, // --bg-color
        points: 12.00,
        maxDistance: 25.00,
        spacing: 18.00
    });

    // Initialize Typed.js
    const typed = new Typed('#typed-text', {
        strings: ['Full-Stack Developer.', 'Creative Problem Solver.', 'Lifelong Learner.', 'Tech Enthusiast.'],
        typeSpeed: 60,      // Slightly slower, more natural typing speed.
        backSpeed: 40,      // Slower and less aggressive backspacing.
        backDelay: 2000,    // Adds a 2-second pause after a sentence is typed.
        startDelay: 1000,   // Waits 1 second before starting the animation on page load.
        loop: true
    });
    
    // Smooth scrolling for navigation links
    $('.navbar-nav a').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70 // Adjust for fixed navbar height
            }, 300, function() {
                window.location.hash = hash;
            });
        }
    });

});