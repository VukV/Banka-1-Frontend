import { Injectable } from '@angular/core';
import {UserModel} from "../../model/user/user-model";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {Parser} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private bankUrl = environment.bankUrl;
  private currentAccUrl = environment.bankUrl+"/current_acc";

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
  getAllAccountsForLoggedInUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.bankUrl}/user_accounts`, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getAllTransactionsForAccount(accountNumber:string) {
    const params=new HttpParams().set("accountNumber",accountNumber);
    return this.httpClient.get<any>(`${this.bankUrl}/account_payments`, {
      headers: this.headers, params:params
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getAllPaymentReceiversForLoggedInUser() {
    return this.httpClient.get<any>(`${this.bankUrl}/user_receivers`, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  changeAccountName(newAccountName: string, id:number, accountType:string) {
    return this.httpClient.put<any>(`${this.bankUrl}/`+accountType+`/update_name/`+id+`/`+newAccountName, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
