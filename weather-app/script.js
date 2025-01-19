const apiKey = '71253a0c3ae84678aebe5d2c5c62ad36'; // Replace with your actual API key
const searchButton = document.getElementById('search-btn');
const locationButton = document.getElementById('location-btn');
const locationInput = document.getElementById('location-input');
const locationText = document.querySelector('.location');
const temperatureText = document.querySelector('.temperature');
const descriptionText = document.querySelector('.description');
const humidityText = document.querySelector('.humidity');
const windText = document.querySelector('.wind');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

locationButton.addEventListener('click', getLocationWeather);

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            displayWeatherData(data);
        } else {
            alert('Location not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again later.');
    }
}

function displayWeatherData(data) {
    locationText.textContent = `${data.name}, ${data.sys.country}`;
    temperatureText.textContent = `Temperature: ${data.main.temp}°C`;
    descriptionText.textContent = `Weather: ${data.weather[0].description}`;
    humidityText.textContent = `Humidity: ${data.main.humidity}%`;
    windText.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherDataByCoordinates(latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function fetchWeatherDataByCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            displayWeatherData(data);
        } else {
            alert("Unable to fetch weather data.");
        }
    } catch (error) {
        console.error("Error fetching weather data by location:", error);
        alert("An error occurred while fetching weather data.");
    }
}
