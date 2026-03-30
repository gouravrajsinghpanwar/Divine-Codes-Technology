(function () {

    emailjs.init({
        publicKey: "xlRwrVTURaLPUPOU5",
    });

    const form = document.getElementById('main-contact-form');
    const successDiv = document.getElementById('form-success');
    const submitBtn = document.getElementById('submitBtn');
    const sendAnother = document.getElementById('send-another');

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(`${fieldId}-error`);
        if (field) field.style.borderColor = '#ff3860';
        if (errorDiv) { errorDiv.textContent = message; errorDiv.style.display = 'block'; }
    }
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(`${fieldId}-error`);
        if (field) field.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        if (errorDiv) errorDiv.style.display = 'none';
    }

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name) { showFieldError('name', 'Full name is required'); isValid = false; } else { clearFieldError('name'); }
        if (!email) { showFieldError('email', 'Email address is required'); isValid = false; }
        else if (!email.includes('@') || !email.includes('.')) { showFieldError('email', 'Enter a valid email'); isValid = false; }
        else { clearFieldError('email'); }
        if (!message) { showFieldError('message', 'Message cannot be empty'); isValid = false; } else { clearFieldError('message'); }
        return isValid;
    }
    const EMAILJS_SERVICE_ID = "service_842fld5";
    const EMAILJS_TEMPLATE_ADMIN = "template_2di36e2";
    const EMAILJS_TEMPLATE_USER = "template_rcic9qg";

    async function sendEmails(formData) {
        const adminParams = {
            to_name: "Divinecode Team",
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || "General Inquiry",
            message: formData.message,
            newsletter: formData.newsletter ? "Yes" : "No"
        };

        const userParams = {
            to_email: formData.email,
            user_name: formData.name,
            reply_subject: formData.subject || "General Inquiry",
            reply_message: formData.message,
            company: "Divinecode Technology"
        };

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, adminParams);
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_USER, userParams);
            return true;
        } catch (error) {
            console.error("EmailJS error:", error);
            alert("There was an issue sending your message. Please try again later or contact us directly via email.");
            return false;
        }
    }

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            if (!validateForm()) return;

            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subjectSelect = document.getElementById('subject');
            const subject = subjectSelect.options[subjectSelect.selectedIndex]?.text || "General Inquiry";
            const message = document.getElementById('message').value;
            const newsletter = document.getElementById('newsletter').checked;

            const formData = { name, email, subject, message, newsletter };

            const success = await sendEmails(formData);

            if (success) {
                form.style.display = 'none';
                successDiv.style.display = 'block';
            } else {
                alert("Failed to send. Please try again or email us directly at divinecodestech@gmail.com");
            }

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message →";
        });
    }

    if (sendAnother) {
        sendAnother.addEventListener('click', function () {
            form.reset();
            form.style.display = 'block';
            successDiv.style.display = 'none';
            ['name', 'email', 'message'].forEach(id => clearFieldError(id));
        });
    }
    const resetBtn = form?.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            setTimeout(() => {
                ['name', 'email', 'message'].forEach(id => clearFieldError(id));
            }, 10);
        });
    }
})();
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('mobileOverlay');
function closeMenu() { mobileNav?.classList.remove('open'); overlay?.classList.remove('active'); menuBtn?.classList.remove('active'); document.body.style.overflow = ''; }
function openMenu() { mobileNav?.classList.add('open'); overlay?.classList.add('active'); menuBtn?.classList.add('active'); document.body.style.overflow = 'hidden'; }
if (menuBtn) menuBtn.addEventListener('click', (e) => { e.stopPropagation(); mobileNav?.classList.contains('open') ? closeMenu() : openMenu(); });
if (overlay) overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-nav__link').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 768 && mobileNav?.classList.contains('open')) closeMenu(); });

const fadeElements = document.querySelectorAll('.fade');
const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function (e) { const href = this.getAttribute('href'); if (href === "#" || href === "") return; const target = document.querySelector(href); if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }); });

const tiltCards = document.querySelectorAll('.contact-option, .contact-sidebar-card');
tiltCards.forEach(card => { card.addEventListener('mousemove', (e) => { const rect = card.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; card.style.transform = `perspective(1000px) rotateX(${y * 3}deg) rotateY(${x * 3}deg) translateY(-5px)`; }); card.addEventListener('mouseleave', () => { card.style.transform = ''; }); });