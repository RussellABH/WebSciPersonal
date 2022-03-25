import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.css']
})
export class AjaxComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  @Output() sendDataEvent = new EventEmitter<any>();

  sendData(value: any) {
    this.sendDataEvent.emit(value);
  }

  search() {
    let username = (<HTMLInputElement>document.getElementById("usernameInput")!).value;
    document.getElementById("alertDiv")!.innerHTML = ''; 
    console.log("Going to search for " + username + " in search.");
    this.httpService.sendGetRequest("http://localhost:3000/profile/"+ username).subscribe((data) => {
      this.sendData(data);
    });
  }

}
