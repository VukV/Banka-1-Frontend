import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {Listing} from "../../model/capital/listing";

@Injectable({
  providedIn: 'root'
})
export class CapitalService {

  //TODO
  private capitalUrl = environment.capitalUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient, private currentUserService: CurrentUserService) {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      if(loggedIn){
        this.headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
        });
      }
    });
  }

  getUserCapital(userId: number): Observable<any>{
    return this.httpClient.get(this.capitalUrl, {
      params: {
        "userId": userId
      },
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

}
