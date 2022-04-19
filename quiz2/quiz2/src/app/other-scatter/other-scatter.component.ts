import { Component, OnInit } from '@angular/core';
import * as c3 from "c3";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-other-scatter',
  templateUrl: './other-scatter.component.html',
  styleUrls: ['./other-scatter.component.css']
})
export class OtherScatterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  @Output() sendDataEvent2 = new EventEmitter<any>();

  sendData(value: any) {
    this.sendDataEvent2.emit(value);
  }

  makeGraph() {
    this.http.get("/mongo").subscribe((data: any) => {
      let userScore: [string, ...c3.Primitive[]] = ['User Score'];
      let myScore: [string, ...c3.Primitive[]] = [''];
      let names: string[] = [];
      let numDocs = 0;
      for (let g in data) {
        if (data[g]['id'] < 2272 && data[g]['update'] != "This document was updated") {
          userScore.push(data[g]["user_review"]);
          myScore.push(data[g]["score"])
          names.push(data[g]["name"]);
          numDocs += 1;
        }
      }
      this.sendData(numDocs);
      var chart = c3.generate({
        bindto: '#chart2',
        data: {
          x: 'User Score',
          columns: [
            userScore,
            myScore
          ],
          type: 'scatter'
        },
        axis: {
          y: {
            label: {
              text: 'Twitch Popularity Score',
              position: 'outer-middle'
            }
          },
          x: {
            label: {
              text: 'User Score',
              position: 'outer-center'
            }
          }
        },
        tooltip: {
          format: {
            name: function (name, ratio, id, index) {
              return names[index];
            }
          }
        }
      });
    });
  }
}
