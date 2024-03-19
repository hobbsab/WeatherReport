const apiKey = '37e6228807b1cbe9c035512c6ab1399d';
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const searchForm = document.querySelector('#location-form');
const tempElement = document.getElementById('temperature');
const windElement = document.getElementById('wind-speed');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weather-icon');

searchBtn.addEventListener('click', () => {
    let city = searchInput.value; // city is search result
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tempElement = data.main.temp;
            const humidityElement = data.main.humidity;
            const description = data.weather[0].description;

            weatherInfo.innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Description: ${description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
        });
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        tempElement.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        windElement.textContent = `${data.wind.speed} m/s`;
        humidityElement.textContent = `${data.main.humidity}%`;
        weatherIconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    })
    .catch(error => console.error('Error fetching data:', error));
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Get daily forecast data

        const forecastContainer = document.querySelector('.forecast');

        forecastData.forEach(day => {
            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');

            const date = new Date(day.dt * 1000);
            const icon = day.weather[0].icon;
            const temp = day.main.temp;
            const windSpeed = day.wind.speed;
            const humidity = day.main.humidity;

            weatherCard.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" class="weather-icon">
                <p>Date: ${date.toDateString()}</p>
                <p>Temperature: ${temp}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Humidity: ${humidity}%</p>
            `;

            forecastContainer.appendChild(weatherCard);
        });
    })
});

// searchForm.addEventListener("submit", function (event) {
//   event.preventDefault()
//   getAPI()
//   getWeek()
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// });