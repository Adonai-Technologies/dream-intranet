/* ===========================
   Live Clock Widget
=========================== */
const clockElement = document.getElementById('clock');

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update every second
if (clockElement) {
    updateClock();
    setInterval(updateClock, 1000);
}

/* ===========================
   Weather Widget
=========================== */
const weatherElement = document.getElementById('weather');
const apiKey = "YOUR_API_KEY"; // Get from openweathermap.org
const city = "Accra"; // Change to your location
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherElement.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            <span>${city}: ${temp}°C, ${description}</span>
        `;
    } catch (error) {
        weatherElement.textContent = "Weather data unavailable";
        console.error("Weather fetch error:", error);
    }
}

if (weatherElement) {
    fetchWeather();
}

/* ===========================
   Sidebar Toggle
=========================== */
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

/* ===========================
   Real-Time Notifications
=========================== */
const notificationsList = document.getElementById('notifications-list');

// Dummy notifications
const notifications = [
    "📢 HR: Submit your timesheet by Friday",
    "📅 Team meeting at 3 PM today",
    "🎉 Welcome our new intern: Sarah!",
    "🚨 System maintenance this weekend",
    "🏆 Congrats to the sales team for hitting targets!"
];

function updateNotifications() {
    const randomIndex = Math.floor(Math.random() * notifications.length);
    const newNotification = notifications[randomIndex];

    // Add new notification at the top
    const li = document.createElement('li');
    li.textContent = newNotification;
    notificationsList.prepend(li);

    // Keep only last 5 notifications
    while (notificationsList.children.length > 5) {
        notificationsList.removeChild(notificationsList.lastChild);
    }
}

// Initial load
notificationsList.innerHTML = '';
for (let i = 0; i < 3; i++) updateNotifications();

// Update every 7 seconds
setInterval(updateNotifications, 7000);

/* ===========================
   Drag-and-Drop Sidebar Widgets
=========================== */
const sidebarWidgets = document.getElementById('sidebar-widgets');

let draggedWidget = null;

// Load widget order from Local Storage
function loadWidgetOrder() {
    const savedOrder = JSON.parse(localStorage.getItem('widgetOrder'));
    if (savedOrder) {
        savedOrder.forEach(widgetClass => {
            const widget = document.querySelector(`.${widgetClass}`);
            if (widget) sidebarWidgets.appendChild(widget);
        });
    }
}

// Save widget order
function saveWidgetOrder() {
    const widgetOrder = Array.from(sidebarWidgets.children).map(widget =>
        widget.classList[1] // widget-clock, widget-weather, etc.
    );
    localStorage.setItem('widgetOrder', JSON.stringify(widgetOrder));
}

// Drag Events
sidebarWidgets.addEventListener('dragstart', (e) => {
    draggedWidget = e.target;
    e.target.classList.add('dragging');
});

sidebarWidgets.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    draggedWidget = null;
    saveWidgetOrder();
});

sidebarWidgets.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(sidebarWidgets, e.clientY);
    if (afterElement == null) {
        sidebarWidgets.appendChild(draggedWidget);
    } else {
        sidebarWidgets.insertBefore(draggedWidget, afterElement);
    }
});

// Helper function to find position
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Load saved order on page load
loadWidgetOrder();
