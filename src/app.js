function formatTime(timestamp) {
  let dateAndTime = document.querySelector("#date-and-time");
  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let month = timestamp.getMonth();
  let dateNumber = timestamp.getDate();
  let hours = timestamp.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = timestamp.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  dateAndTime.innerHTML = `${months[month]} ${dateNumber}, ${hours}:${minutes}`;
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  city = city.value;
  showCity(city);
}
function showCity(city) {
  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(retrieveTemperature);
}
function displayCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = "12";
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.classList.remove("selected");
  let celsius = document.querySelector("#celsius-link");
  celsius.classList.add("selected");
}
function displayFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = "54";
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.classList.add("selected");
  let celsius = document.querySelector("#celsius-link");
  celsius.classList.remove("selected");
}
function showCelsius(temperature) {
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = temperature;
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.classList.remove("selected");
  let celsius = document.querySelector("#celsius-link");
  celsius.classList.add("selected");
}
function retrieveTemperature(response) {
  let h1 = document.querySelector("#city");
  let city = response.data.name;
  h1.innerHTML = `${city},`;
  let temperature = Math.round(response.data.main.temp);
  showCelsius(temperature);
  let lowTemperature = Math.round(response.data.main.temp_min);
  let highTemperature = Math.round(response.data.main.temp_max);
  document.querySelector(
    "#today"
  ).innerHTML = `${highTemperature}ºC/${lowTemperature}ºC`;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather");
  description.innerHTML = weatherDescription;
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  windElement.innerHTML = `Wind: ${windSpeed} km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let timeUpdated = response.data.dt * 1000;
  let date = new Date(timeUpdated);
  formatTime(date);
}
function displayCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrent);
}
function showCurrent(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(retrieveTemperature);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", displayCurrent);

showCity("Paris");
