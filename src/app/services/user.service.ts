import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/UserModel";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CurrentUserService} from "./current-user.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly apiUrl = environment.postApi

  headers: any = {
    Authorization: `Bearer ${this.currentUserService.getToken()}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(private httpClient: HttpClient, private currentUserService: CurrentUserService) { }

  loadAllUsers(): Observable<User[]> {
    let headers = new HttpHeaders()
    headers = this.headers;
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`, {
      headers,
    });
  }
}
