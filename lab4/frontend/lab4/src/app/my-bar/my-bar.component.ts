import { Component, OnInit } from '@angular/core';
import * as c3 from "c3";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-bar',
  templateUrl: './my-bar.component.html',
  styleUrls: ['./my-bar.component.css']
})
export class MyBarComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("/games").subscribe((data: any) => {
      let scores: [string, ...c3.Primitive[]] = ['Scores'];
      let sales: [string, ...c3.Primitive[]] = ['Sales (millions)'];
      let titles: string[] = [];
      for (let g in data) {
        if (data[g]["total_sold"] == "33.15" || data[g]["total_sold"] == "19.50" || data[g]["total_sold"] == "17.20" || data[g]["total_sold"] == "12.00" || data[g]["total_sold"] == "15.00")
        scores.push(data[g]["critic_score"]);
        sales.push(data[g]["total_sold"])
        titles.push(data[g]["title"]);
      }
      console.log(scores);
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          x: 'Scores',
          columns: [
            scores,
            sales
          ],
          type: 'bar'
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
          show: false
        }
      });
    });
  }
}
