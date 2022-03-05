function alert(message) {
  divForAlert = document.getElementById("alertDiv");
  divForAlert.innerHTML = '<div class="alert alert-danger alert-dismissible fixed-top" role="alert">' + message + '</div>';
}

function search() {
  let username = $("#usernameInput").val();
  console.log(username);
  document.getElementById("alertDiv").innerHTML = ''; 
  $.ajax({
    type: "GET",
    url: "http://localhost:3001/profile/" + username,
    dataType: "json",
    success: function (data) {
      if (data.exists == 1) {
        fillData(data);
      } else {
        alert("Cannot find that username on Steam. Try a different username.");
      }
    },
    error: (err) => {
      alert("Sorry, there was an error connecting to our servers, please try again later.");
    }
  });
}

function fillData(data) {
  document.getElementById("avatar").setAttribute("src", data.avatarmedium);

  document.getElementById("displayName").innerHTML = data.personaname;

  let allStatus = {
    0 : "offline",
    1 : "online", 
    2 : "busy", 
    3 : "away",
    4 : "snoozed",
    5 : "looking to trade",
    6 : "looking to play"
  };
  document.getElementById("status").innerHTML = "Currently " + allStatus[data.personastate];

  document.getElementById("id").innerHTML = "Steam ID: " + data.steamid;

  document.getElementById("gameCount").innerHTML = "Currently has " + data.game_count + " games";

  var date = new Date(data.lastlogoff * 1000);
  document.getElementById("lastOnline").innerHTML = "Last online on " + date.toLocaleTimeString('en-US');
}

$("#usernameButton").click((e) => { 
  e.preventDefault();
  search();
});

$("#usernameInput").keydown((event) => { 
  if (event.which == 13) {
    search();
  }
});