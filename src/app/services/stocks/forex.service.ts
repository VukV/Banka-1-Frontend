import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {TimeSeriesQueryEnum} from "../../model/stocks/time-series-query-enum";
import {CurrentUserService} from "../user/current-user.service";

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  private forexUrl = environment.forexUrl;
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

  getForex(fromCurrencyCode: string, toCurrencyCode: string, page: number, size: number): Observable<any>{
    return this.httpClient.post(this.forexUrl, {
      "fromCurrencyCode": fromCurrencyCode,
      "toCurrencyCode": toCurrencyCode
    },
      {
        headers: this.headers, params:{"page": page, "size": size}
      }
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getForexTimeSeries(fromCurrency: string, toCurrency: string, timeSeries: TimeSeriesQueryEnum): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("timeSeries", timeSeries);
    queryParams = queryParams.append("fromCurrency", fromCurrency);
    queryParams = queryParams.append("toCurrency", toCurrency);

    return this.httpClient.get(this.forexUrl,
      {
        headers: this.headers,
        params: queryParams})
      .pipe(
        catchError(err => {
          return throwError(() => new Error(err.error.message))
        })
      )
  }

}
