var cityInputEl = document.querySelector("#city-input");
var cityFormEl = document.querySelector("#city-form");
var savedCitiesEl = document.querySelector("#history");
var clearHistoryBtn = document.querySelector("#clear-history");
var currentDate = moment().format("M/D/YY");
var getHistoryBtn = document.querySelector("#history");

var uvIndex = function (lat, lon) {
  //api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
  http: var apiUrl =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=7682a77c64471c5fd05aba694f7c40b8";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      var uvValue = data.value;
      var uvFormat = uvValue.toFixed(2);
      // UV Index Color coding conditions
      if (uvFormat < 3) {
        document.getElementById("uv-index").innerHTML =
          "UV Index: " +
          `<span class=" badge badge-success">${uvFormat}</span>`;
      } else if (uvFormat > 2.99 && uvFormat < 6) {
        document.getElementById("uv-index").innerHTML =
          "UV Index: " +
          `<span class=" badge badge-warning">${uvFormat}</span>`;
      } else if (uvFormat > 5.99) {
        document.getElementById("uv-index").innerHTML =
          "UV Index: " + `<span class=" badge badge-danger">${uvFormat}</span>`;
      }
    });
  });
};

var getFiveDay = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial" +
    "&appid=7682a77c64471c5fd05aba694f7c40b8";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      var forecast = data.list;
      var htmlData = [];
      for (let i = 0; i < forecast.length; i = i + 8) {
        var dateFormat = forecast[i].dt;
        var timeZoneOffset = city.timezone;
        var timeZoneOffsetHours = timeZoneOffset / 60 / 60;
        var today = moment
          .unix(dateFormat)
          .utc()
          .utcOffset(timeZoneOffsetHours);
        var data = `
        <h6 class="font-weight-bolder mt-3"> ${today.format("ddd")} </h6>
        <img src="https://openweathermap.org/img/wn/${
          forecast[i].weather[0].icon
        }@2x.png"</img>
        <h6>Temp: ${parseInt(forecast[i].main.temp)}&#176</h6>
        <h6 class="mb-4">Hum: ${forecast[i].main.humidity}&#37</h6>`;
        htmlData.push(data);
      }

      document.getElementById("day-1").innerHTML = htmlData[0];
      document.getElementById("day-2").innerHTML = htmlData[1];
      document.getElementById("day-3").innerHTML = htmlData[2];
      document.getElementById("day-4").innerHTML = htmlData[3];
      document.getElementById("day-5").innerHTML = htmlData[4];
      // document.getElementById("weather-icon").setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
    });
  });
};

var getCityWeather = function (city) {
  // format the github api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=7682a77c64471c5fd05aba694f7c40b8";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        uvIndex(lat, lon);
        document.getElementById("city-name").textContent =
          city + " (" + currentDate + ")";
        document.getElementById("temperature").textContent =
          "Temperature: " + parseInt(data.main.temp) + "°";
        document.getElementById("humidity").textContent =
          "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind-speed").textContent =
          "Wind Speed: " + parseInt(data.wind.speed) + " mph";
        document.getElementById("description").textContent =
          data.weather[0].description;
        document
          .getElementById("weather-icon")
          .setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              ".png"
          );
      });
    })
    .then(function (response) {
      saveCity(city);
      displayCities(history);
    });
};

var cityInputHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var cityName = cityInputEl.value.trim();
  console.log(cityName);
  if (cityName) {
    getCityWeather(cityName);
    getFiveDay(cityName);
    //clear cityInputEl.value
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
  console.log(event);
};

cityFormEl.addEventListener("submit", cityInputHandler);

// Function to save the city to localStorage
var saveCity = function (newCity) {
  var cityExists = false;
  // Check if City exists in local storage
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === newCity) {
      cityExists = true;
      break;
    }
  }
  // Save to localStorage if city is new
  if (cityExists === false) {
    localStorage.setItem("cities" + localStorage.length, newCity);
  }
};

var getHistoryHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var cityHistory = document.getElementById("history").textContent;
  var savedCity = event.target.innerText;
  getCityWeather(savedCity);
  getFiveDay(savedCity);
};

getHistoryBtn.addEventListener("click", getHistoryHandler);

// display the list of searched cities
var displayCities = function () {
  var history = document.querySelector("#history");
  history.innerHTML = "";
  for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem("cities" + i);
    var historyEl = document.createElement("button");
    historyEl.classList = "form-control mb-2";
    historyEl.innerHTML = city;
    history.appendChild(historyEl);
  }
};
displayCities();

var clearHistory = function () {
  localStorage.clear();
  history.innerHTML = "";
  displayCities(history);
};

clearHistoryBtn.addEventListener("click", clearHistory);

