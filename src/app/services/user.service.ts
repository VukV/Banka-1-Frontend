import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserModel} from "../model/user-model";
import {catchError, Observable, throwError} from "rxjs";
import {LogInResponse} from "../model/log-in-response";
import {LogInRequest} from "../model/log-in-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.usersUrl + "/reset-password";
  private loginUrl = environment.usersUrl + "/login"
  private forgotPasswordUrl = environment.usersUrl + "/forgot-password"

  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

  addUser(email: string, phone: string, jmbg: string, firstName: string, lastName: string, position: string, roles: string[])
  : Observable<UserModel> {
    const userCreationData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      jmbg: jmbg,
      phoneNumber: phone,
      position: position,
      roles: roles
    };
    console.log(userCreationData);
    return this.httpClient.post<UserModel>(`${this.usersUrl}/api/users/create`, userCreationData, {
      headers: this.headers
    });
  }

  activatePassword(id: string, secretKey: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.usersUrl}/${id}`, {password, secretKey}, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  logUserIn(loginReq: LogInRequest): Observable<LogInResponse> {
    var email = loginReq.email
    var password = loginReq.password
    return this.httpClient.post<LogInResponse>(`${this.loginUrl}`, {email, password}, {
    } ).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
        })
    )
  }

  resetPasswordRequest(email: string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email",email);
    return this.httpClient.get<any>( `${this.forgotPasswordUrl}`, {params: queryParams}
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    )
  }

}
