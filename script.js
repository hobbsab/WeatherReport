const apiKey = '37e6228807b1cbe9c035512c6ab1399d';
// html elements
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const searchForm = document.querySelector('#location-form');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temperature');
const windElement = document.getElementById('wind-speed');
const humidityElement = document.getElementById('humidity');
const weatherIconElement = document.getElementById('weather-icon');
const forecastdiv = document.getElementById('forecastdiv');
const date = new Date

searchBtn.addEventListener('click', () => {
    event.preventDefault()
    forecastdiv.style.display = "block";
    let city = searchInput.value; // city is search result
    console.log(city, "city")
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(url, "url")
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        dateElement.textContent = `${date.toDateString()}`;
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

            const dateForecast = new Date(day.dt * 1000);
            const icon = day.weather[0].icon;
            const temp = Math.round(day.main.temp - 273.15); // celsius
            const windSpeed = day.wind.speed;
            const humidity = day.main.humidity;

            weatherCard.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" class="weather-icon">
                <p>Date: ${dateForecast.toDateString()}</p>
                <p>Temperature: ${temp}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Humidity: ${humidity}%</p>
            `;

            forecastContainer.appendChild(weatherCard);
        });
    })
});