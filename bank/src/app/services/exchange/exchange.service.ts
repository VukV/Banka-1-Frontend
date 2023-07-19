import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {ExchangeResponse} from "../../model/exchange/exchange";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private exchangeUrl = environment.bankUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient, private currentUserService: CurrentUserService) {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
        });
      }
    });
  }

  getExchangeRates(): Observable<any> {
    return this.httpClient.get(this.exchangeUrl + '/exchange_pairs', {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getExchangeHistory(): Observable<any> {
    return this.httpClient.get(this.exchangeUrl + '/user_conversions', {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  initExchange(accountNumber: string, from: string, to: string, amount: number): Observable<any>{
    return this.httpClient.post(this.exchangeUrl + '/convert_money', {
        senderAccountNumber: accountNumber,
        receiverAccountNumber: accountNumber,
        exchangePairSymbol: from + '/' + to,
        amount: amount
    },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  confirmExchange(exchange: ExchangeResponse): Observable<any>{
    return this.httpClient.post(this.exchangeUrl + '/confirm_conversion', {
        senderAccountNumber: exchange.senderAccountNumber,
        receiverAccountNumber: exchange.receiverAccountNumber,
        exchangePairSymbol: exchange.exchangePairSymbol,
        amount: exchange.amount,
        convertedAmount: exchange.convertedAmount,
        exchangeRate: exchange.exchangeRate,
        commissionFee: exchange.commissionFee
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

}
