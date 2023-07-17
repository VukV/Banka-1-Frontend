import {Injectable} from '@angular/core';
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
  private currentAccUrl = environment.bankUrl + "/current_acc";
  private foreignAccUrl = environment.bankUrl + "/foreign_currency_acc";
  private bussinessAccUrl = environment.bankUrl + "/business_acc";

  private interestRate: number = 0.0;
  private maintenanceCost: number = 255.0;

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

  getAllAccountsForLoggedInUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.bankUrl}/user_accounts`, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getAllTransactionsForAccount(accountNumber: string) {
    const params = new HttpParams().set("accountNumber", accountNumber);
    return this.httpClient.get<any>(`${this.bankUrl}/account_payments`, {
      headers: this.headers, params: params
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

  changeAccountName(newAccountName: string, id: number, accountType: string) {
    return this.httpClient.put<any>(`${this.bankUrl}/` + accountType + `/update_name/` + id + `/` + newAccountName, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createCurrentAccount(ownerId: number, nameAccount: string, currentUserId: number, selectedAccountType: string, interestRate: number, maintenanceCost: number) {
    if (selectedAccountType == "PENSION" || selectedAccountType == "STUDENT")
      this.interestRate = 0.5

    const currentAccountCreationData = {
      ownerId: ownerId,
      accountName: nameAccount,
      employeeId: currentUserId,
      accountType: selectedAccountType,
      interestRate: interestRate,
      maintenanceCost: maintenanceCost
    }
    return this.httpClient.post<any>(`${this.currentAccUrl}/open`, currentAccountCreationData, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createForeignAccount(ownerId: number, nameAccount: string, currentUserId: number, selectedCurrency1: string, selectedCurrency2: string, selectedCurrency3: string, selectedAccountType: string) {
    const listValues: string[] = [];

    listValues.push(selectedCurrency1)
    if (selectedCurrency2 != "" && selectedCurrency2 != null) {
      listValues.push(selectedCurrency2)
    }
    if (selectedCurrency3 != "" && selectedCurrency3 != null) {
      listValues.push(selectedCurrency3)
    }
    const foreignAccountCreationData = {
      ownerId: ownerId,
      accountName: nameAccount,
      employeeId: currentUserId,
      accountType: selectedAccountType,
      defaultCurrencyCode: selectedCurrency1,
      interestRate: this.interestRate,
      maintenanceCost: this.maintenanceCost,
      foreignCurrencyBalances: listValues
    }
    return this.httpClient.post<any>(`${this.foreignAccUrl}/open`, foreignAccountCreationData, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createBussinessAccount(ownerId: number, nameAccount: string, currentUserId: number, selectedCompanyId: number) {
    const currentAccountCreationData = {
      ownerId: ownerId,
      accountName: nameAccount,
      employeeId: currentUserId,
      companyId: selectedCompanyId,
    }
    return this.httpClient.post<any>(`${this.bussinessAccUrl}/open`, currentAccountCreationData, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
