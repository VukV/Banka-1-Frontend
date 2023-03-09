import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.usersUrl + "/reset-password";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) {
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
}
