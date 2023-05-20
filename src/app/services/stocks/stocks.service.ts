import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {TimeSeriesQueryEnum} from "../../model/stocks/time-series-query-enum";
import {CurrentUserService} from "../user/current-user.service";
import {Option} from "../../model/stocks/stock";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private stocksUrl = environment.stocksUrl;
  private optionsUrl = environment.optionsUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient, private currentUserService: CurrentUserService, private datePipe: DatePipe) {
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

  getStockBySymbol(symbol: string): Observable<any>{
    return this.httpClient.get(this.stocksUrl + "/symbols/" + symbol,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    );
  }

  getOptions(expirationDate: Date | null, symbol: string): Observable<any> {
    return this.httpClient.post<Option[]>(this.optionsUrl,
      {
        expirationDate: this.datePipe.transform(expirationDate, "yyyy-MM-dd"),
        symbol: symbol
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    )
  }

  getAllStockSymbols(): Observable<any> {
    return this.httpClient.get(this.stocksUrl + "/symbols",
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    );
  }

}
