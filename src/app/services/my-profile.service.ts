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


export class MyProfileService{

  private loginUrl = environment.usersUrl + "/login"
  private forgotPasswordUrl = environment.usersUrl + "/forgot-password"
  private usersUrl = environment.usersUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) { }

  getMyprofile(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.usersUrl}/api/users/my-profile/${id}`, {
      headers: this.headers
    });
  }

  updateMyprofile( phone: string,  firstName: string,
             lastName: string)
    {
    const userUpdateData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
    };
    return this.httpClient.put<UserModel>(`${this.usersUrl}/api/my-profile/update`, userUpdateData, {
      headers: this.headers
    });
  }

  changePasswordRequest(email: string): Observable<any>{
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
