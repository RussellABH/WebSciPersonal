import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjaxComponent } from './ajax/ajax.component';
import { MongoInterfaceComponent } from './mongo-interface/mongo-interface.component';
import { MyBarComponent } from './my-bar/my-bar.component';
import { MyScatterComponent } from './my-scatter/my-scatter.component';

@NgModule({
  declarations: [
    AppComponent,
    AjaxComponent,
    MongoInterfaceComponent,
    MyBarComponent,
    MyScatterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
