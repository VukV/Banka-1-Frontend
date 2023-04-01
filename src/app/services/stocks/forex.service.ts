import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  private forexUrl = environment.forexUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

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


}
