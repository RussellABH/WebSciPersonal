import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz 2';

  fillMyData(data : any) {
    document.getElementById("myData")!.innerHTML = "The Meta Score graph used " + data + " documents.";
  }

  fillOtherData(data: any) {
    document.getElementById("otherData")!.innerHTML = "The User Score graph used " + data + " documents.";
  }
}
