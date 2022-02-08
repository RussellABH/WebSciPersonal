function alert(message) {
  divForAlert = $("#alertDiv")
  var wrapper = document.createElement('div');
  wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible fixed-top" role="alert">' + message + '</div>';
  divForAlert.html(wrapper);
}

function search() {
  let username = $("#usernameInput").val();
  console.log(username);
  $("#alertDiv").html(''); // Gets rid of alert if one was there
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/profile/" + username,
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
  $("#avatar").attr("src", data.avatarmedium);

  $("#displayName").html(data.personaname);

  let allStatus = {
    0 : "offline",
    1 : "online", 
    2 : "busy", 
    3 : "away",
    4 : "snoozed",
    5 : "looking to trade",
    6 : "looking to play"
  };
  $("#status").html("Currently " + allStatus[data.personastate])

  $("#id").html("Steam ID: " + data.steamid);

  $("#gameCount").html("Currently has " + data.game_count + " games")

  var date = new Date(data.lastlogoff * 1000);
  $("#lastOnline").html("Last online on " + date.toLocaleTimeString('en-US'));
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