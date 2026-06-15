// =========================
// MOBILE MENU
// =========================

const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('.mobile-overlay');

if(menuBtn){

    menuBtn.addEventListener('click', () => {

        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('active');

    });

}

if(overlay){

    overlay.addEventListener('click', () => {

        menuBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');

    });

}

// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    '.fade, .about-card, .skill-card, .venture-card, .achievement-card, .timeline-item'
);

const revealOnScroll = () => {

    revealElements.forEach(el => {

        const elementTop = el.getBoundingClientRect().top;

        if(elementTop < window.innerHeight - 120){

            el.classList.add('show');

        }

    });

};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// =========================
// ACTIVE NAV LINK
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav__link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("nav__link--active");

        if(
            link.getAttribute("href") === "#" + current
        ){

            link.classList.add("nav__link--active");

        }

    });

});

// =========================
// HEADER SCROLL EFFECT
// =========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.08)";

    }else{

        header.style.boxShadow = "none";

    }

});

// =========================
// COUNTER ANIMATION
// =========================

const counters = document.querySelectorAll(".stat-number");

let started = false;

function startCounters(){

    if(started) return;

    const statsSection =
    document.querySelector(".founder-stats");

    if(!statsSection) return;

    const position =
    statsSection.getBoundingClientRect().top;

    if(position < window.innerHeight){

        counters.forEach(counter => {

            const target =
            parseInt(counter.dataset.target);

            let count = 0;

            const increment =
            target / 100;

            const updateCounter = () => {

                if(count < target){

                    count += increment;

                    counter.innerText =
                    Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText = target;

                }

            };

            updateCounter();

        });

        started = true;

    }

}

window.addEventListener("scroll", startCounters);

// =========================
// SMOOTH SCROLL
// =========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// =========================
// FLOATING ELEMENTS
// =========================

const cards = document.querySelectorAll(
    '.card, .venture-card, .achievement-card'
);

cards.forEach(card => {

    card.addEventListener('mousemove', e => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        const rotateX =
        (y - rect.height/2) / 25;

        const rotateY =
        (rect.width/2 - x) / 25;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)`;

    });

    card.addEventListener('mouseleave', () => {

        card.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0)';

    });

});

// =========================
// TYPEWRITER EFFECT
// =========================

const heroTitle =
document.querySelector(".hero__headline");

if(heroTitle){

    const text =
    heroTitle.textContent;

    heroTitle.textContent = "";

    let i = 0;

    function typeWriter(){

        if(i < text.length){

            heroTitle.textContent +=
            text.charAt(i);

            i++;

            setTimeout(typeWriter, 40);

        }

    }

    setTimeout(typeWriter, 500);

}

// =========================
// PARALLAX EFFECT
// =========================

window.addEventListener("scroll", () => {

    const blurBg =
    document.querySelector(".blur-bg");

    const blurBg2 =
    document.querySelector(".blur-bg-2");

    const scrollY =
    window.pageYOffset;

    if(blurBg){

        blurBg.style.transform =
        `translateY(${scrollY * 0.1}px)`;

    }

    if(blurBg2){

        blurBg2.style.transform =
        `translateY(-${scrollY * 0.08}px)`;

    }
// =========================
// HERO IMAGE AUTO SLIDER
// =========================

const slides = document.querySelectorAll(".slide");

if(slides.length > 0){

    let currentSlide = 0;

    function changeSlide(){

        slides[currentSlide].classList.remove("active");
        slides[currentSlide].classList.add("prev");

        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        slides.forEach((slide,index)=>{

            if(index !== currentSlide){
                slide.classList.remove("active");
            }

        });

        slides[currentSlide].classList.remove("prev");
        slides[currentSlide].classList.add("active");

    }

    setInterval(changeSlide,15000);

}
});
