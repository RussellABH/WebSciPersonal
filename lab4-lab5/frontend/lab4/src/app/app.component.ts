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
}