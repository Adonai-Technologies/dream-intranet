

/* ===========================
   Dark Mode Toggle
=========================== */
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

if (darkModeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        }
    });
}

/* ===========================
   Scroll Reveal Animation
=========================== */
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    animatedElements.forEach(el => {
        if (el) {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add('visible');
            }
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ===========================
   Assign animation classes safely
=========================== */
const hero = document.querySelector('.hero');
const team = document.querySelector('.team-spotlight');
const events = document.querySelector('.upcoming-events');
const quickLinks = document.querySelector('.quick-links');

if (hero) hero.classList.add('fade-in');
if (team) team.classList.add('slide-in-left');
if (events) events.classList.add('slide-in-right');
if (quickLinks) quickLinks.classList.add('zoom-in');
