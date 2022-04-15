import { Component, OnInit } from '@angular/core';
import * as c3 from "c3";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-scatter',
  templateUrl: './my-scatter.component.html',
  styleUrls: ['./my-scatter.component.css']
})
export class MyScatterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("/games").subscribe((data: any) => {
      let scores: [string, ...c3.Primitive[]] = ['Scores'];
      let sales: [string, ...c3.Primitive[]] = ['Sales (millions)'];
      let titles: string[] = [];
      for (let g in data) {
        scores.push(data[g]["critic_score"]);
        sales.push(data[g]["total_sold"])
        titles.push(data[g]["title"]);
      }
      console.log(scores);
      var chart = c3.generate({
        bindto: '#chart1',
        data: {
          x: 'Scores',
          columns: [
            scores,
            sales
          ],
          type: 'scatter'
        },
        axis: {
          y: {
            label: {
              text: 'Game Sales',
              position: 'outer-middle'
            }
          },
          x: {
            label: {
              text: 'Critic Rating',
              position: 'outer-center'
            }
          }
        },
        tooltip: {
          format: {
            name: function (name, ratio, id, index) { 
              console.log(index);
              return titles[index];
            }
          }
        }
      });
    });
  }
}
