import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiserver = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(url: string) {
    return this.httpClient.get(url);
  }
}
