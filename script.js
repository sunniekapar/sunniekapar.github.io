const track = document.querySelector('.slideshow');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.slideshow-button-right');
const prevButton = document.querySelector('.slideshow-button-left');
const dotsNav = document.querySelector('.slideshow-nav');
const dots = Array.from(dotsNav.children);

var windowSize = innerWidth; //width of the screen
var slideWidth = slides[0].getBoundingClientRect().width; // width of the slide


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

function resizeSlides() {
    var newWindowSize = innerWidth;
    const scaleFac = newWindowSize / windowSize;
    windowSize = newWindowSize;
    slideWidth *= scaleFac;
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.left = slideWidth * i + 'px';
    }
}
window.addEventListener('resize', resizeSlides); // whenever someone resizes screen

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    currentDot.classList.add('not-current-slide');
    targetDot.classList.remove('not-current-slide');
    targetDot.classList.add('current-slide');
}

const updateButtons = (targetIndex, prevButton, nextButton, dots) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex == dots.length - 1) {
        nextButton.classList.add('is-hidden');
        prevButton.classList.remove('is-hidden');
    } else {
        nextButton.classList.remove('is-hidden');
        prevButton.classList.remove('is-hidden');
    }
}

//right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    updateButtons(nextIndex, prevButton, nextButton, dots);

});

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    updateButtons(prevIndex, prevButton, nextButton, dots);
});

dotsNav.addEventListener('click', e => {
    // what button was clicked
    const targetDot = e.target.closest('button');
    if (!targetDot) return; // if user does not click on button
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    updateButtons(targetIndex, prevButton, nextButton, dots);
});


///////////////////////// NAV BURGER //////////////////////////////////////
const navButton = document.querySelector('.nav-burger');
const navItems = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay-hidden');
const navLinks = document.querySelectorAll('.navitem');

let navOpen = false;
navButton.addEventListener('click', () => {
    if (!navOpen) {
        navButton.classList.add('open');
        navItems.classList.add('openNav');
        overlay.classList.remove('overlay-hidden');
        navOpen = true;
    } else {
        navButton.classList.remove('open');
        navItems.classList.remove('openNav');
        overlay.classList.add('overlay-hidden');
        navOpen = false;
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navOpen) {
            navButton.classList.remove('open');
            navItems.classList.remove('openNav');
            overlay.classList.add('overlay-hidden');
            navOpen = false;
        }
    });
});

////////////////// conctact form ////////////////////
const contactButton = document.querySelectorAll('.contactBtn');
const closeButton = document.querySelector('.contact-form-close');
const contactForm = document.querySelector('.contact-container');
let contactFormOpen = false;

contactButton.forEach(button => {
    button.addEventListener('click', () => {
        if (!contactFormOpen) {
            contactForm.classList.remove('contact-container-hidden');
            overlay.classList.remove('overlay-hidden');
            contactFormOpen = true;
        } else {
            contactForm.classList.add('contact-container-hidden');
            overlay.classList.add('overlay-hidden');
            contactFormOpen = false;
        }
    });
});

closeButton.addEventListener('click', () => {
    if (!contactFormOpen) {
        contactForm.classList.remove('contact-container-hidden');
        contactFormOpen = true;
    } else {
        contactForm.classList.add('contact-container-hidden');
        overlay.classList.add('overlay-hidden');
        contactFormOpen = false;
    }
});

//////////////////////////////////////// need to fix
const sendMessageBtn = document.querySelector('.send-message-button');
sendMessageBtn.addEventListener('click', () => {
    if (!contactFormOpen) {
        contactForm.classList.remove('contact-container-hidden');
        contactFormOpen = true;
    } else {
        contactForm.classList.add('contact-container-hidden');
        overlay.classList.add('overlay-hidden');
        contactFormOpen = false;
    }
})