import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

  getForex(){

  }


}
