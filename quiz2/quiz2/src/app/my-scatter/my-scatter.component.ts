import { Component, OnInit } from '@angular/core';
import * as c3 from "c3";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-scatter',
  templateUrl: './my-scatter.component.html',
  styleUrls: ['./my-scatter.component.css']
})
export class MyScatterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  @Output() sendDataEvent1 = new EventEmitter<any>();

  sendData(value: any) {
    this.sendDataEvent1.emit(value);
  }

  makeGraph() {
    this.http.get("/mongo").subscribe((data: any) => {
      let metaScore: [string, ...c3.Primitive[]] = ['Meta Score'];
      let myScore: [string, ...c3.Primitive[]] = [''];
      let names: string[] = [];
      let numDocs = 0;
      for (let g in data) {
        if (data[g]['id'] < 2272 && data[g]['update'] != "This document was updated") {
          metaScore.push(data[g]["meta_score"]);
          myScore.push(data[g]["score"])
          names.push(data[g]["name"]);
          numDocs += 1;
        }
      }
      this.sendData(numDocs);
      var chart = c3.generate({
        bindto: '#chart1',
        data: {
          x: 'Meta Score',
          columns: [
            metaScore,
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
              text: 'Meta Score',
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
