import {CurrentUserService} from "./current-user.service";
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

  private loginUrl = environment.usersUrl + "/login"
  private forgotPasswordUrl = environment.usersUrl + "/forgot-password"
  private usersUrl = environment.usersUrl;
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
    return this.httpClient.post<UserModel>(`${this.usersUrl}/api/users/create`, userCreationData, {
      headers: this.headers
    });
  }

  getUser(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.usersUrl}/api/users/${id}`, {
      headers: this.headers
    });
  }

  updateUser(id: number, email: string, phone: string, password: string, firstName: string,
             lastName: string, position: string, roles: string[], active: boolean)
    : Observable<UserModel> {
    const userUpdateData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phoneNumber: phone,
      position: position,
      roles: roles,
      active: active
    };
    return this.httpClient.put<UserModel>(`${this.usersUrl}/api/users/update/${id}`, userUpdateData, {
      headers: this.headers
    });
  }

  activatePassword(id: string, secretKey: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.usersUrl}/reset-password/${id}`, {password, secretKey}, {
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
  loadAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.usersUrl, {
    headers: this.headers
  }).pipe(
    catchError(err => {
      return throwError(() => new Error(err.error.message));
      })
    );
  }

  updateMyprofile( phone: string,  firstName: string,
                   lastName: string)
  {
    const userUpdateData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
    };
    return this.httpClient.put<UserModel>(`${this.usersUrl}/api/my-profile/update`,{firstName,lastName,phone}, {
      headers: this.headers
    });
  }


  getMyProfile(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.usersUrl}/api/my-profile`, {
      headers: this.headers
    });
  }
}
