import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {TimeSeriesQueryEnum} from "../../model/stocks/time-series-query-enum";
import {CurrentUserService} from "../user/current-user.service";

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private stocksUrl = environment.stocksUrl;
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

  getStocks(symbol: string, page: number, size: number): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("symbol", symbol);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("size", size);

    return this.httpClient.get(this.stocksUrl,
      {
      headers: this.headers,
      params: queryParams})
      .pipe(
        catchError(err => {
          return throwError(() => new Error(err.error.message))
        })
      )
  }

  getStockTimeSeries(symbol: string, timeSeries: TimeSeriesQueryEnum): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("timeSeries", timeSeries);
    queryParams = queryParams.append("symbol", symbol);

    return this.httpClient.get(this.stocksUrl + '/time-series',
      {
        headers: this.headers,
        params: queryParams})
      .pipe(
        catchError(err => {
          return throwError(() => new Error(err.error.message))
        })
      )
  }

  getStock(stockId: number): Observable<any>{
    return this.httpClient.get(this.stocksUrl + "/" + stockId,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    )
  }

  getOptions(): Observable<any>{
    return this.httpClient.get(this.stocksUrl + "/", //TODO
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    )
  }

}
