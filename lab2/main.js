function alert(message) {
    divForAlert = $("#alertDiv")
    var wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' + message + '</div>';
    divForAlert.append(wrapper);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            $.ajax({
                type: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude +
                    "&lon=" + position.coords.longitude + "&units=imperial&appid=4e76e1870e14a23b53389ef96b8c4c81",
                success: showData
            });
        }, showGeoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showGeoError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permission denied, please allow location permission to display weather.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("Request for location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function showData(data) {
    console.log(data);
    let title = $("#title");
    let image = $("#weatherImage");
    let humidity = $("#humidity");
    let temperature = $("#temp") ;
    let wind = $("#wind");

    $("#loading").addClass("d-none");

    title.html("Weather for " + data['name'] +', ' + data['sys']['country']);
    image.attr("src", "http://openweathermap.org/img/wn/"+ data['weather'][0]['icon']+ "@2x.png");
    humidity.append(" " + data['main']['humidity'] + '%');
    temperature.append(" " + data['main']['temp'] + "&deg;");
    wind.append(" " + data['wind']['speed'] + "mph");
}

getLocation();