var resorts = {
    "locations": [
        {
            "name": "Antigua",
            "lat": "17.08",
            "lon": "-61.82",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Bahamas",
            "lat": "23.69",
            "lon": "-75.82",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Barbados",
            "lat": "13.17",
            "lon": "-59.55",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Jamaica",
            "lat": "18.49",
            "lon": "-77.92",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Turks & Caicos",
            "lat": "21.79",
            "lon": "-71.81",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Cancun",
            "lat": "21.17",
            "lon": "-86.83",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Dominican Republic",
            "lat": "18.61",
            "lon": "-68.35",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Tortola",
            "lat": "18.43",
            "lon": "-64.63",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Costa Rica",
            "lat": "8.63",
            "lon": "-83.52",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Panama",
            "lat": "9.31",
            "lon": "-79.18",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "Colombia",
            "lat": "10.4",
            "lon": "-75.5",
            "weather": "",
            "weatherImg": ""
        },
        {
            "name": "St. Lucia",
            "lat": "13.9",
            "lon": "-60.97",
            "weather": "",
            "weatherImg": ""
        }
    ]
};

$(document).ready(function() {
    'use strict';

    var map = L.map('map').setView([16.83, -72.95], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'nicknordale.nnj8a31p',
        accessToken: 'pk.eyJ1Ijoibmlja25vcmRhbGUiLCJhIjoiY2lmdTN2b2JnMWs3aHVna3I4bGxqMDNzNSJ9.yNkphJiLTNJMsaoOqJYrJQ'
    }).addTo(map);

    var mark = L.icon.mapkey({icon:"beach",color:'#725139',background:'#f2c357',size:30});
    var popupOptions = {
        'keepInView': 'true'
    };

    function buildMap() {
        console.log();
        $.each(resorts.locations, function(index, value) {
            getWeather(value).then(function() {
                L.marker([value.lat, value.lon],{icon:mark})
                    .bindPopup("<h3 class=map-popup-title>" + value.name + "</h3>" +
                    "<p class=map-popup-content><span><strong>" + value.weather + " °F</strong></span><span>" + value.weatherImg + "</span><br/>" +
                    "<a href=http://students.washington.edu/nordale1/info343/343FP/CSdeliverable/homepage.html#resorts-row>See the resorts</a></p>", popupOptions)
                    .addTo(map);
            })
        });
    }

    function getWeather(value) {
        return $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + value.lat + "&lon=" + value.lon + "&APPID=6584681eea3d012963220225316e90ec").then(function(data) {
            var weather = data.main.temp;
            var image = data.weather[0].icon;
            var imageElement = "<img src='http://openweathermap.org/img/w/" + image + ".png'>";
            weather = weather * (9/5) - 459.67;
            weather = Math.round(weather);
            value.weather = weather;
            value.weatherImg = imageElement;
        });
    }

    function renderMap() {
        buildMap();
    }

    renderMap();

});
