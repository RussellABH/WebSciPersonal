function alert(message) {
  divForAlert = $("#alertDiv")
  var wrapper = document.createElement('div');
  wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible fixed-top" role="alert">' + message + '</div>';
  divForAlert.html(wrapper);
}

function search() {
  let zip_code = $("#temperatureInput").val();
  console.log(zip_code);
  $("#alertDiv").html(''); // Gets rid of alert if one was there
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/temperature/" + zip_code,
    dataType: "json",
    success: function (data) {
      fillData(data);
    },
    error: (err) => {
      alert("Sorry, there was an error connecting to our servers, please try again later.");
    }
  });
}

function fillData(data) {
  console.log(data);
  let temp = (data.main.temp - 273.15) * 9 / 5 + 32;

  if (temp < 33) {
    $('#output').css('color', 'Blue');
    $('#output').html("The temperature is freezing!")
  } else if (temp >= 33 && temp < 51) {
    $('#output').css('color', 'Aqua');
    $('#output').html("The temperature is cold.")
  } else if (temp >= 51 && temp < 80) {
    $('#output').css('color', 'IndianRed');
    $('#output').html("The temperature is warm. :)")
  } else if (temp >= 80) {
    $('#output').css('color', 'Crimson');
    $('#output').html("The temperature is hot!")
  } 
}

$("#temperatureButton").click((e) => { 
  e.preventDefault();
  search();
});

$("#temperatureInput").keydown((event) => { 
  if (event.which == 13) {
    search();
  }
});

$("#windButton").click((e) => {
  e.preventDefault();
  console.log("Button clicked");
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/wind/",
    dataType: "json",
    success: function (data) {
      let wind_speed = data.wind.speed;
      $('#output').css('color', 'White');
      $('#output').html("The wind is " + wind_speed + " m/s at RPI.")
    },
    error: (err) => {
      alert("Sorry, there was an error connecting to our servers, please try again later.");
    }
  });

})