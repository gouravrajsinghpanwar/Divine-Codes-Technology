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

// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    '.about-card, .skill-card, .venture-card, .achievement-card, .timeline-item, .stat-card'
);

function revealOnScroll() {

    revealElements.forEach(element => {

        const top = element.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            element.classList.add('show');
        }

    });

}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// =========================
// HEADER SHADOW
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// =========================
// SMOOTH SCROLL
// =========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// =========================
// CARD HOVER EFFECT
// =========================

const cards = document.querySelectorAll(
    '.about-card, .skill-card, .venture-card, .achievement-card'
);

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX =
            (y - rect.height / 2) / 30;

        const rotateY =
            (rect.width / 2 - x) / 30;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    });

});


// =========================
// COUNTER ANIMATION
// =========================

const statCards = document.querySelectorAll(".stat-card h3");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector("#stats");

    if (!statsSection) return;

    const position =
        statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight) {

        statCards.forEach(counter => {

            const text = counter.innerText;

            const number =
                parseInt(text.replace(/\D/g, ''));

            if (!number) return;

            let count = 0;

            const increment =
                Math.ceil(number / 50);

            function updateCounter() {

                if (count < number) {

                    count += increment;

                    counter.innerText =
                        count + "+";

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = text;

                }

            }

            updateCounter();

        });

        counterStarted = true;

    }

}

window.addEventListener("scroll", startCounters);


// =========================
// HERO IMAGE AUTO SLIDER
// =========================

const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {

    let currentSlide = 0;

    function changeSlide() {

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        slides[currentSlide].classList.add("active");

    }

    setInterval(changeSlide, 10000);

}


// =========================
// PAGE LOAD ANIMATION
// =========================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
