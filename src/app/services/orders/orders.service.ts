import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {MakeOrderRequest} from "../../model/orders/make-order-request";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {OrderStatusEnum} from "../../model/orders/order-status-enum";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersUrl = environment.ordersUrl;
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

  makeOrder(makeOrderRequest: MakeOrderRequest): Observable<any>{
    return this.httpClient.post(this.ordersUrl + "/make-order",
        makeOrderRequest,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getUserOrders(orderStatus: OrderStatusEnum | null, done: boolean | null, userId: number):Observable<any>{
    return this.httpClient.post(this.ordersUrl + "/by-user",
      {
        "orderStatus": orderStatus,
        "done": done,
        "userId": userId
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getAllOrders(orderStatus: OrderStatusEnum | null, done: boolean | null): Observable<any>{
    return this.httpClient.post(this.ordersUrl + "/all",
      {
        "orderStatus": orderStatus,
        "done": done
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  approveOrder(orderId: number): Observable<any> {
    return this.httpClient.post(this.ordersUrl + "/approve/" + orderId, null, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  rejectOrder(orderId: number): Observable<any> {
    return this.httpClient.post(this.ordersUrl + "/reject/" + orderId, null, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
