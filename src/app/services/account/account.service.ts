import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {Account} from "../../model/account/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountsUrl = environment.accountsUrl

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

    getAccountsByCompany(companyId: string | null): Observable<any> {
    return this.httpClient.get(this.accountsUrl + "/list/" + companyId,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createAccount(companyId: string, accountNumber: string, bankName: string, type: string): Observable<any> {
    return this.httpClient.post(this.accountsUrl,
      {
        companyId: companyId,
        accountNumber: accountNumber,
        bankName: bankName,
        type: type
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  deleteAccount(accountId: string): Observable<any>{
    return this.httpClient.delete(this.accountsUrl + '/' + accountId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

}
