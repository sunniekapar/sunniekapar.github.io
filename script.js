const track = document.querySelector('.slideshow');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.slideshow-button-right');
const prevButton = document.querySelector('.slideshow-button-left');
const dotsNav = document.querySelector('.slideshow-nav');
const dots = Array.from(dotsNav.children);

var windowSize = innerWidth; //width of the screen
var slideWidth = slides[0].getBoundingClientRect().width + 2; // width of the slide


// nav 
const navButton = document.querySelector('.nav-burger');
const navItems = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay-hidden');
const navLinks = document.querySelectorAll('.navitem');
let navOpen = false;

// contact 
const contactButton = document.querySelectorAll('.contactBtn');
const closeButton = document.querySelector('.contact-form-close');
const contactForm = document.querySelector('.contact-container');
let contactFormOpen = false;
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
function openOverlay(open) {
    if (open) {
        overlay.classList.remove('overlay-hidden'); // adds overlay
    } else {
        overlay.classList.add('overlay-hidden');   // removes the overlay     
    }
}

function openNav(open) {
    if (open) {
        navButton.classList.add('open'); // closes nav burger
        navItems.classList.add('openNav'); // closes side navigation bar
        navOpen = true;
    } else {
        navButton.classList.remove('open'); // closes nav burger
        navItems.classList.remove('openNav'); // closes side navigation bar
        navOpen = false;
    }
}

function openContactContainer(open) {
    if(open) {
        contactForm.classList.remove('contact-container-hidden');
        contactFormOpen = true;
    } else {
        contactForm.classList.add('contact-container-hidden');
        contactFormOpen = false;
    }
}

navButton.addEventListener('click', () => {
    if (!navOpen) {
        openNav(true);
        openOverlay(true);
    } else {
        openNav(false);
        openOverlay(false);
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
            openNav(false);
            openOverlay(false);
    });
});

////////////////// conctact form ////////////////////
contactButton.forEach(button => {
    button.addEventListener('click', () => {
        openNav(false);
        openOverlay(true);
        openContactContainer(true);
    });
});

closeButton.addEventListener('click', () => {
    openContactContainer(false);
    openOverlay(false);
});

overlay.addEventListener('click', () => {
    openOverlay(false);
    openNav(false);
    openContactContainer(false);
});
























////////// experience sliding in change this up

const experiences = document.querySelectorAll('.experience-cards');
const revealExperience = function (experiences, observer) {
    const [experience] = experiences;

    if (!experience.isIntersecting) return;

    experience.target.classList.remove('experience-cards-hidden');
    observer.unobserve(experience.target);
}

const experienceObserver = new IntersectionObserver(revealExperience, {
    root: null,
    threshold: 0.1
});

experiences.forEach(function (experience) {
    experienceObserver.observe(experience);
    experience.classList.add('experience-cards-hidden');
});