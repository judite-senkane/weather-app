function formatTime(date) {
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
  let month = date.getMonth();
  let dateNumber = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${months[month]} ${dateNumber}, ${hours}:${minutes}`;
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
  let weatherDescription = response.data.weather[0].main;
  let description = document.querySelector("#weather");
  description.innerHTML = weatherDescription;
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${windSpeed} km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
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
let dateAndTime = document.querySelector("#date-and-time");
let currentDate = new Date();
dateAndTime.innerHTML = formatTime(currentDate);

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", displayCurrent);

showCity("Paris");
