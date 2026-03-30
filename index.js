
const faders = document.querySelectorAll('.fade');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
faders.forEach(el => observer.observe(el));

const menuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('mobileOverlay');

function closeMenu() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
}

function openMenu() {
    mobileNav.classList.add('open');
    overlay.classList.add('active');
    menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
}

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileNav.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener('click', closeMenu);

const mobileLinks = document.querySelectorAll('.mobile-nav__link');
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
        closeMenu();
    }
});

const magBtn = document.querySelector('.hero__actions .btn--primary');
if (magBtn) {
    magBtn.addEventListener('mousemove', (e) => {
        const rect = magBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        magBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    magBtn.addEventListener('mouseleave', () => {
        magBtn.style.transform = 'translate(0,0) scale(1)';
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const blurs = document.querySelectorAll('.blur-bg');
    blurs.forEach((blur, idx) => {
        blur.style.transform = `translateY(${scrolled * 0.05 * (idx === 0 ? 1 : -1)}px)`;
    });
});

const tiltCards = document.querySelectorAll('.card, .team-card, .project-showcase, .featured');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const scrollIndicator = document.getElementById('scrollIndicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    });
}
