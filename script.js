// doc

// const apiKey = '37e6228807b1cbe9c035512c6ab1399d';

// searchForm.addEventListener('submitbtn', function(event) {
//   event.preventDefault();

//   const cityName = searchInput.value;

//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       // weather data from API and update html
//       console.log(data);
//     })
//     .catch(error => {6
//       console.error(error);
//     });
// });
const searchInput = document.querySelector('#maininput');
const apiKey = '37e6228807b1cbe9c035512c6ab1399d';
const searchForm = document.querySelector('#location-form');

searchForm.addEventListener("submit", function (event) {
  event.preventDefault()
  getAPI()
  getWeek()
});

console.log (searchInput.value);

// Make API request
function getAPI() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    // weather data from API
    const temperature = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    let city = searchInput.value;

    // html update with data
    document.getElementById('temptext').textContent = temperature;
    document.getElementById('windtext').textContent = wind;
    document.getElementById('humiditytext').textContent = humidity;
    document.getElementById('city').textContent = city;
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

function getWeek() {
    // forecast info
    const forecastData = data.list;

    // html
    forecastData.forEach(day => {
      const date = day.dt_txt;
      const temperature = day.main.temp;
      const weatherIcon = day.weather[0].icon;

      const forecastItem = document.createElement('div');
      forecastItem.classList.add('week');

      const dateElement = document.createElement('p');
      dateElement.textContent = date;
      forecastItem.appendChild(dateElement);

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = temperature;
      forecastItem.appendChild(temperatureElement);

      const weatherIconElement = document.createElement('img');
      weatherIconElement.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      forecastItem.appendChild(weatherIconElement);

      // append in html
      const forecastContainer = document.getElementById('forecast-container');
      forecastContainer.appendChild(forecastItem);
    });
  });
  .catch(error => {
    console.log('Error:', error);
  });