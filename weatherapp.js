//date and time

function showDate() {

  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
  hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
  }

  let dayToday= document.querySelector("#today");
  dayToday.innerHTML = `${day} ${month} ${date} ${year}`;
  let timeNow = document.querySelector("#time");
  timeNow.innerHTML = `${hours}:${minutes}`;
}

//buttons and search form

let form = document.querySelector("#citySubmit");
form.addEventListener("click", city);

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city.value}`;
  searchCity(city.value);
  showDate();
}

function searchCity(city) {
  let apiKey = "cd0505d0c14f390be6a62ee650d13e27";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  
  document.querySelector("#city").innerHTML = response.data.name;
  let weatherNow = document.querySelector("#temperature-unit");
  let temperature = Math.round(response.data.main.temp);
  weatherNow.innerHTML = `${temperature}`;
}


// gps
function searchLocation(position) {
  let apiKey = "cd0505d0c14f390be6a62ee650d13e27";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  showDate();
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", displayCurrentLocation);


//weather conversion
function changeCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", changeFahrenheit);

