import { Injectable } from '@angular/core';
import {RecieverModel, UpdateReceiverModel} from "../../model/payments/reciever-model";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {PaymentModel} from "../../model/payments/domestic-payments-model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private getReceiversUrl = environment.bankUrl + "/user_receivers"
  private createReceiverUrl = environment.bankUrl + "/create_receiver"
  private deleteReceiverUrl = environment.bankUrl + "/delete_receiver"
  private createPaymentUrl = environment.bankUrl + "/make_payment"
  private getConversionsUrl = environment.bankUrl + "/user_conversions"
  private getPaymentsUrl = environment.bankUrl + "/user_payments"
  private updateReceiverUrl = environment.bankUrl + "/update_receiver"
  private getUserAccountsUrl = environment.bankUrl + "/user_accounts"
  private createTransferUrl = environment.bankUrl + "/transfer_money"


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

  createPayment(receiverName: string, senderAccountNumber: string, receiverAccountNumber: string, amount: number, referenceNumber: string, paymentNumber: string,
                paymentPurpose: string): Observable<any> {
    return this.httpClient.post(this.createPaymentUrl,
      {
        receiverName: receiverName,
        senderAccountNumber: senderAccountNumber,
        receiverAccountNumber: receiverAccountNumber,
        amount: amount,
        referenceNumber: referenceNumber,
        paymentNumber: paymentNumber,
        paymentPurpose: paymentPurpose
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createReceiver(name: string, accountNumber: string, referenceNumber: string, paymentNumber: string, paymentPurpose: string): Observable<any> {
    return this.httpClient.post(this.createReceiverUrl,
      {
        receiverName: name,
        receiverAccountNumber: accountNumber,
        referenceNumber: referenceNumber,
        paymentNumber: paymentNumber,
        paymentPurpose: paymentPurpose
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  deleteReceiver(id: number): Observable<any>{
     return this.httpClient.delete(this.deleteReceiverUrl + '/' + id, {
      headers: this.headers,
       responseType: 'text'
    }).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getReceivers(page: number, size: number): Observable<any> {
    return this.httpClient.get(this.getReceiversUrl, {
      headers: this.headers,
      params: { page: page.toString(), size: size.toString() }
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getReceiverList(): Observable<any> {
    return this.httpClient.get(this.getReceiversUrl, {
      headers: this.headers,
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getExistingReceivers(): Observable<any> {
    return this.httpClient.get(this.getReceiversUrl, {
      headers: this.headers,
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getDomesticPayments(page: number, size: number): Observable<any> {
    return this.httpClient.get(this.getPaymentsUrl, {
      headers: this.headers,
      params: { page: page.toString(), size: size.toString() }
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getExchanges(page: number, size: number): Observable<any> {
    return this.httpClient.get(this.getConversionsUrl, {
      headers: this.headers,
      params: { page: page.toString(), size: size.toString() }
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  updateReceiver(id: number, receiverName: string, receiverAccountNumber: string, referenceNumber: string,
                 paymentNumber: string, paymentPurpose: string)
    : Observable<UpdateReceiverModel> {
    const updateReceiverData = {
      receiverName: receiverName,
      receiverAccountNumber: receiverAccountNumber,
      referenceNumber: referenceNumber,
      paymentNumber: paymentNumber,
      paymentPurpose: paymentPurpose,
    };
    return this.httpClient.put<UpdateReceiverModel>( this.updateReceiverUrl + '/' + id, updateReceiverData, {
      headers: this.headers
    });
  }

  getAllAccountsForLoggedInUser(): Observable<any> {
    return this.httpClient.get(this.getUserAccountsUrl, {
      headers: this.headers,
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createTransfer(senderAccountNumber: string, receiverAccountNumber: string, amount: number, currencySymbol: string): Observable<any> {
    return this.httpClient.post(this.createTransferUrl,
      {
        senderAccountNumber: senderAccountNumber,
        receiverAccountNumber: receiverAccountNumber,
        amount: amount,
        currencySymbol: currencySymbol,
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
