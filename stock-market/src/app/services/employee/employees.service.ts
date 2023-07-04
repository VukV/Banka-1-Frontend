import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employeesUrl = environment.usersUrl;
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

  getEmpolyees(page: number, size: number): Observable<any> {
    const url = `${this.employeesUrl}/supervise`;
    return this.httpClient.get(url, {
      headers: this.headers,
      params: { page: page.toString(), size: size.toString() }
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
  resetDailyLimit(userId: number): Observable<any> {
    const url = `${this.employeesUrl}/reset-daily-limit`;

    const params = new HttpParams()
      .set('userId', userId.toString())

    return this.httpClient.put(url, null, {
      headers: this.headers,
      params: params
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    )};

  setDailyLimit(userId: number, setLimit: number): Observable<any> {
    const url = `${this.employeesUrl}/set-daily-limit`;

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('setLimit', setLimit.toString());

    return this.httpClient.put(url, null, {
      headers: this.headers,
      params: params
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    )};

}
