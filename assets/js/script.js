var cityInputEl = document.querySelector("#city-input");
var cityFormEl = document.querySelector("#city-form");

var getCityWeather = function(cityInputEl) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&units=imperial" + "&appid=7682a77c64471c5fd05aba694f7c40b8";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };

getCityWeather(cityInputEl);

var cityInputHandler = function(event) {
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