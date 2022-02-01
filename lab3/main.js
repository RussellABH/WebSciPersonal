function search() {
  let username = $("#usernameInput").val();
  console.log(username);
  
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