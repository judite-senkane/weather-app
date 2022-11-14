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
  let apiKey = "f9feaa2306a84023f1oae3tfc99d5be3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(retrieveTemperature);
}
function displayCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(celsiusTemperature);
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.classList.remove("selected");
  let celsius = document.querySelector("#celsius-link");
  celsius.classList.add("selected");
}
function displayFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.classList.add("selected");
  let celsius = document.querySelector("#celsius-link");
  celsius.classList.remove("selected");
}
function getForecast(city) {
  let apiKey = "f9feaa2306a84023f1oae3tfc99d5be3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function retrieveTemperature(response) {
  let h1 = document.querySelector("#city");
  let city = response.data.city;
  h1.innerHTML = `${city},`;
  getForecast(city);
  let degrees = document.querySelector("#degrees");
  celsiusTemperature = response.data.temperature.current;
  degrees.innerHTML = Math.round(celsiusTemperature);
  let weatherDescription = response.data.condition.description;
  let description = document.querySelector("#weather");
  description.innerHTML = weatherDescription;
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${windSpeed} m/s`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let timeUpdated = response.data.time * 1000;
  let date = new Date(timeUpdated);
  formatTime(date);
  let icon = document.querySelector("#icon");
  let iconUrl = response.data.condition.icon_url;
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", response.data.condition.icon);
}
function displayCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrent);
}
function showCurrent(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f9feaa2306a84023f1oae3tfc99d5be3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(retrieveTemperature);
}
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col weather-forecast">
          <div class="weather-forecast-date">${formatDay(
            forecastDay.time * 1000
          )}</div>
          <img src=${forecastDay.condition.icon_url} alt="${
          forecastDay.condition.icon
        }" class="forecast-icon" width="42"/>
          <div class="weather-forecast-temperatures">
            <strong class="forecast-temperature-max"> ${Math.round(
              forecastDay.temperature.maximum
            )}ºC </strong>
            <span class="forecast-temperature-min">${Math.round(
              forecastDay.temperature.minimum
            )}ºC</span>
          </div>
        </div>
      `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusTemperature = null;

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", displayCurrent);

showCity("Paris");
