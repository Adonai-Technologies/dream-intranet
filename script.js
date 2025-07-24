// Dynamic Greeting
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();
if (hour < 12) greeting.textContent = "Good Morning!";
else if (hour < 18) greeting.textContent = "Good Afternoon!";
else greeting.textContent = "Good Evening!";

// Real-time Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Upcoming Events with Countdown
const events = [
  { date: "2025-07-28", title: "Quarterly Meeting" },
  { date: "2025-08-05", title: "Team Building Activity" },
  { date: "2025-08-15", title: "Product Launch" }
];

const eventList = document.getElementById("eventList");
events.forEach(ev => {
  const li = document.createElement("li");
  const eventDate = new Date(ev.date);
  const now = new Date();
  const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
  li.textContent = `${ev.title} - ${ev.date} (${diffDays} days left)`;
  eventList.appendChild(li);
});

// Team Spotlight
const team = [
  { name: "Jane Doe", role: "Project Manager", img: "https://i.pravatar.cc/80?img=1" },
  { name: "John Smith", role: "Developer", img: "https://i.pravatar.cc/80?img=2" },
  { name: "Lisa Wong", role: "Designer", img: "https://i.pravatar.cc/80?img=3" }
];

const teamGrid = document.getElementById("teamGrid");
team.forEach(member => {
  const div = document.createElement("div");
  div.className = "team-member";
  div.innerHTML = `<img src="${member.img}" alt="${member.name}"><h3>${member.name}</h3><p>${member.role}</p>`;
  teamGrid.appendChild(div);
});

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Scroll Reveal Function
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add 'reveal' class to all widgets and hero
document.querySelectorAll('.widget, .hero').forEach(section => {
  section.classList.add('reveal');
});

// Resource Search
const searchBar = document.getElementById('searchBar');
const resourceList = document.querySelectorAll('#resourceList li');

searchBar.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  resourceList.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});
