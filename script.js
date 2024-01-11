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
});

console.log (searchInput.value);

// Make API request
function getAPI() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}`)
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