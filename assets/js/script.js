var cityInputEl = document.querySelector("#city-input");
var cityFormEl = document.querySelector("#city-form");
var savedCitiesEl = document.querySelector("#history");

var getCityWeather = function (city) {
  // format the github api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=7682a77c64471c5fd05aba694f7c40b8";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  }).then(function(response) {
      saveCity(city);
  }).then(function(response) {
      displayCities(cities);
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
    for (var i = 0; i < localStorage.length; i++) {
        var city = JSON.parse(localStorage.getItem("cities+[i]"));
        var cityEl = document.querySelector("#history");
    }
    // append city to page
    $("#cities").appendChild(cityEl);
}
    