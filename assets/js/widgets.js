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
