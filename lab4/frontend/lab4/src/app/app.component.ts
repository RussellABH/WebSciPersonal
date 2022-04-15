import { Component } from '@angular/core';

interface accociatedList {
  [key: number]: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab4';

  myAlert(message: string) {
    let divForAlert = document.getElementById("alertDiv")!;
    divForAlert.innerHTML = '<div class="alert alert-danger alert-dismissible fixed-top" role="alert">' + message + '</div>';
  }
  
  fillData(data: any) {
    if (data.exists != 1) {
      this.myAlert("Cannot find that username on Steam. Try a different username.");
      return;
    }

    document.getElementById("avatar")!.setAttribute("src", data.avatarmedium);
  
    document.getElementById("displayName")!.innerHTML = data.personaname;
  
    let allStatus: accociatedList = {
      0 : "offline",
      1 : "online", 
      2 : "busy", 
      3 : "away",
      4 : "snoozed",
      5 : "looking to trade",
      6 : "looking to play"
    };
    document.getElementById("status")!.innerHTML = "Currently " + allStatus[data.personastate];
  
    document.getElementById("id")!.innerHTML = "Steam ID: " + data.steamid;
  
    document.getElementById("gameCount")!.innerHTML = "Currently has " + data.game_count + " games";
  
    var date = new Date(data.lastlogoff * 1000);
    document.getElementById("lastOnline")!.innerHTML = "Last online on " + date.toLocaleTimeString('en-US');
  }

  showDatabase() {
    document.getElementById("databaseStuff")!.style.display = "block";
    document.getElementById("hideButton")!.style.display = "block";
    document.getElementById("showButton")!.style.display = "none";
  }

  hideDatabase() {
    document.getElementById("databaseStuff")!.style.display = "none";
    document.getElementById("hideButton")!.style.display = "none";
    document.getElementById("showButton")!.style.display = "block";
  }

  showGraphs() {
    document.getElementById("graphs")!.style.display = "block";
    document.getElementById("hideGraphs")!.style.display = "block";
    document.getElementById("showGraphs")!.style.display = "none";
  }

  hideGraphs() {
    console.log("hideGraphs");
    document.getElementById("graphs")!.style.display = "none";
    document.getElementById("hideGraphs")!.style.display = "none";
    document.getElementById("showGraphs")!.style.display = "block";
  }
}
