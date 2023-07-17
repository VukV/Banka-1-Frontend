import {CurrentUserService} from "./current-user.service";
import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BankUserModel, UserModel} from "../../model/user/user-model";
import {catchError, Observable, throwError} from "rxjs";
import {LogInResponse} from "../../model/user/log-in-response";
import {LogInRequest} from "../../model/user/log-in-request";
import {UserPositionEnum} from "../../model/user/user-position-enum";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = environment.bankUrl + "/login"
  private forgotPasswordUrl = environment.bankUrl + "/forgot-password"
  private usersUrl = environment.bankUrl;

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


  addUser(firstName: string, lastName: string, birthDate: string, homeAddress: string, gender: string, email: string, phoneNumber: string, roles: string[])
  : Observable<BankUserModel> {
    const userCreationData = {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,

      email: email,
      homeAddress: homeAddress,
      gender: gender,
      phoneNumber: phoneNumber,
      roles: roles
    };
    return this.httpClient.post<BankUserModel>(`${this.usersUrl}/register`, userCreationData, {
      headers: this.headers
    });
  }

  getUser(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.usersUrl}/user/${id}`, {
      headers: this.headers
    });
  }

  updateUser(id: number, email: string, phone: string, password: any, firstName: string,
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
    return this.httpClient.put<UserModel>(`${this.usersUrl}/update/${id}`, userUpdateData, {
      headers: this.headers
    });
  }

  activatePassword(id: string, secretKey: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.usersUrl}/reset-password/${id}`, {password, secretKey}, {}).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  logUserIn(loginReq: LogInRequest): Observable<LogInResponse> {
    let email = loginReq.email
    let password = loginReq.password
    return this.httpClient.post<LogInResponse>(`${this.loginUrl}`, {email, password}, {}).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    )
  }

  loadAllUsersFiltered(firstName: string, lastName: string, email: string, datumRodjenja: string): Observable<any> {
    return this.httpClient.post<any>(this.usersUrl + "_filtered",
      {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": datumRodjenja
      },
      {
        headers: this.headers
      }).pipe(
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  resetPasswordRequest(email: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email", email);
    return this.httpClient.get<any>(`${this.forgotPasswordUrl}`, {params: queryParams}
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    )
  }

  loadAllUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.usersUrl}`,
      {
        headers: this.headers
      }
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  updateMyProfile(firstName: string, lastName: string, phone: string) {
    return this.httpClient.put<UserModel>(`${this.usersUrl}/my-profile/update`,
      {
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phone
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getMyProfile(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.usersUrl}/my-profile`, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getUserById(ownerId: string) {
    return this.httpClient.get<any>(`${this.bankUrl}/user/` + ownerId,
      {
        headers: this.headers
      }
    ).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
