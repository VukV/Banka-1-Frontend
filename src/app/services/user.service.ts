import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UserModel} from "../model/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.usersUrl;
  private headers = new HttpHeaders({
    'Authorization':'Bearer ' + localStorage.getItem("jwt")
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
}
