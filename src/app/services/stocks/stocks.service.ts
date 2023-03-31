import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private stocksUrl = environment.stocksUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

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


}
