var cityInputEl = document.querySelector("#city-input");
var cityFormEl = document.querySelector("#city-form");
var savedCitiesEl = document.querySelector("#history");
var clearHistoryBtn = document.querySelector("#clear-history");

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

  if (cityName) {
    getCityWeather(cityName);
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

// display the list of searched cities
var displayCities = function () {
  var history = document.querySelector("#history");
  for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem("cities" + i);
    var historyEl = document.createElement("a");
    historyEl.classList = "form-control mb-2";
    // historyEl.setAttribute = ("href", getCityWeather);
    historyEl.innerHTML = city;
    history.appendChild(historyEl);
  }
};
displayCities();

var clearHistory = function () {
  localStorage.clear();
  displayCities(history);
}

clearHistoryBtn.addEventListener("click", clearHistory);