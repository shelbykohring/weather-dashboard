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
    })
    .then(function (response) {
      displayCities();
    });
};


**********************************


// Function to save the city to localStorage
// var saveCity = function (newCity) {
//   var cityExists = false;
//   // Check if City exists in local storage
//   for (var i = 0; i < localStorage.length; i++) {
//     if (localStorage["cities" + i] === newCity) {
//       cityExists = true;
//       break;
//     }
//   }
//   // Save to localStorage if city is new
//   if (cityExists === false) {
//     localStorage.setItem("cities" + localStorage.length, newCity);
//   }
// };

// // display the list of searched cities
// var displayCities = function () {

//   for (var i = 0; i < localStorage.length; i++) {
//     var cities = 
//   }
// };
// console.log(history);
// displayCities();
