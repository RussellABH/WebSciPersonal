import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyScatterComponent } from './my-scatter/my-scatter.component';
import { HttpClientModule } from '@angular/common/http';
import { OtherScatterComponent } from './other-scatter/other-scatter.component';

@NgModule({
  declarations: [
    AppComponent,
    MyScatterComponent,
    OtherScatterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
