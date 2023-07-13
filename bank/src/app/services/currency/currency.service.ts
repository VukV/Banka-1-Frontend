import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {UserModel} from "../../model/user/user-model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private bankUrl = environment.bankUrl;

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
  getAllCurrencies(): Observable<any> {
    return this.httpClient.get<any>(`${this.bankUrl}/exchange_pairs`, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  convertMoney(amount1: number, currency1: string, currency2: string):Observable<any> {
    const convertMoneyCreationData = {
      "senderAccountNumber": "1",
      "receiverAccountNumber": "1",
      "exchangePairSymbol": currency1+"/"+currency2,
      "amount": amount1,
    };
    return this.httpClient.post<any>(`${this.bankUrl}/convert_money`, convertMoneyCreationData, {
      headers: this.headers
    });
  }
}
