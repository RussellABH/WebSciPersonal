import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-mongo-interface',
  templateUrl: './mongo-interface.component.html',
  styleUrls: ['./mongo-interface.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class MongoInterfaceComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getRequest() {
    let key = (<HTMLInputElement>document.getElementById("keyInput")!).value;
    if (key == '0') {
      key = '';
    }

    if (key == '') {
      (<HTMLInputElement>document.getElementById("output")!).innerHTML = "Must GET on /db, cannot GET all documents.";
    } else {
      this.httpClient.get('/db/' + key).subscribe((data) => {
        (<HTMLInputElement>document.getElementById("output")!).innerHTML = JSON.stringify(data);
      });
    }
  }

  postRequest() {
    let key = (<HTMLInputElement>document.getElementById("keyInput")!).value;
    if (key != '') {
      (<HTMLInputElement>document.getElementById("output")!).innerHTML = "Must POST on /db, cannot POST on a specific document.";
    } else {
      let body = (<HTMLInputElement>document.getElementById("bodyInput")!).value;
      console.log('body');
      console.log(body);
      let theJson = null;
      try {
        theJson = JSON.parse(body);
        console.log(theJson);
      } catch (error) {
        (<HTMLInputElement>document.getElementById("output")!).innerHTML = "Please make sure that the body is exact JSON for POST and PUT.";
        console.log("Please make sure that the body is exact JSON for POST and PUT.");
        return;
      }
      this.httpClient.post('/db', theJson).subscribe((data) => {
        (<HTMLInputElement>document.getElementById("output")!).innerHTML = "Document added.";
      });
    }
  }

  putRequest() {
    let didAll = 0;
    let key = (<HTMLInputElement>document.getElementById("keyInput")!).value;
    if (key == '0') {
      key = '';
      didAll = 1;
    }
    let body = (<HTMLInputElement>document.getElementById("bodyInput")!).value;
    let theJson = null;
    try {
      theJson = JSON.parse(body);
    } catch (error) {
      (<HTMLInputElement>document.getElementById("output")!).innerHTML = "Please make sure that the body is exact JSON for POST and PUT.";
      return;
    }
    this.httpClient.put('/db/' + key, theJson).subscribe((data) => {
      if (didAll == 1) {
        (<HTMLInputElement>document.getElementById("output")!).innerHTML = "All documents updated.";
      } else {
        (<HTMLInputElement>document.getElementById("output")!).innerHTML = "Document updated.";
      }
    });
  }

  deleteRequest() {
    let didAll = 0;
    let key = (<HTMLInputElement>document.getElementById("keyInput")!).value;
    if (key == '0') {
      key = '';
      didAll = 1;
    }

    this.httpClient.delete('/db/' + key).subscribe((data) => {
      if (didAll == 1) {
        (<HTMLInputElement>document.getElementById("output")!).innerHTML = "All documents deleted!";
      } else {
        (<HTMLInputElement>document.getElementById("output")!).innerHTML = "Document deleted.";
      }
    });
  }
}
