let city = "Kyiv";

// let's define our HTML elements here
const searchForm = document.querySelector("#search"),
    resultCard = document.querySelector('#result'),
    cityOut_elem = document.querySelector('#cityOut'),
    mainIcon_elem = document.querySelector('#mainIcon'),
    mainTemp_elem = document.querySelector('#mainTemp'),
    mainDescription_elem = document.querySelector('#mainDescription'),
    minTemp_elem = document.querySelector('#minTemp'),
    maxTemp_elem = document.querySelector('#maxTemp'),
    humidity_elem = document.querySelector('#humidity'),
    windSpeed_elem = document.querySelector('#windSpeed'),
    time = document.querySelector('footer > time'),
    submitButton = document.querySelector("#searchButton"),
    inputCityName = document.querySelector('#cityIn');


document.addEventListener("DOMContentLoaded", function () {
    loadWeatherData(function () {
        resultCard.style.display = "block";
    });
});


searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (this.checkValidity()) {
        submitButton.disabled = true;
        submitButton.value = "Loading...";
        city = inputCityName.value;
        loadWeatherData(function () {
            inputCityName.value = null;
        });
    }
});



function loadWeatherData(callbackFunction) {

    const request = new XMLHttpRequest();

    const key = "eb9ba4d5906d3eecd90f0bb03297ec8b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&APPID=" + key;

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            updateWeatherData(response, callbackFunction);
        }
        else if (this.readyState === 4 && this.status === 404) {
            alert('No results found for "' + city + '", please check the city name.');
            submitButton.disabled = false;
            submitButton.value = "Update";
            inputCityName.value = null;
        }
    };

    request.open("GET", url, true);
    request.send();
}


function updateWeatherData(data, callbackFunction = null) {

    const cityName = data.name,
        icon = data.weather[0].icon,
        icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png",
        description = data.weather[0].description,
        temp = data.main.temp,
        temp_max = data.main.temp_max,
        temp_min = data.main.temp_min,
        humidity = data.main.humidity,
        windSpeed = data.wind.speed,
        deg = "°",
        percent = "%";

    cityOut_elem.innerHTML = cityName;
    mainIcon_elem.setAttribute("src", icon_url);
    mainIcon_elem.setAttribute("alt", description);
    mainTemp_elem.innerHTML = Math.round(temp) + deg;
    mainDescription_elem.innerHTML = description;
    maxTemp_elem.innerHTML = Math.round(temp_max) + deg;
    minTemp_elem.innerHTML = Math.round(temp_min) + deg;
    humidity_elem.innerHTML = humidity + percent;
    windSpeed_elem.innerHTML = windSpeed;

    
    let date = new Date(data.dt * 1000);

    
    time.innerHTML = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        hour12: true,
        minute: 'numeric'
    }).replace(",", " ").replace(/ /, "/").replace(/ /, "/");

    submitButton.disabled = false;
    submitButton.value = "Get Weather";

    
    if (callbackFunction) {
        callbackFunction();
    }
}

function loadBackgroundImage() {

}

function updateBackgroundImage(image) {

}