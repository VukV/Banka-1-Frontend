import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {ContractRequest} from "../../model/contracts/contract-request";
import {ContactRequest, UpdateContactRequest} from "../../model/contacts/contact-request";
import {ContactsResponse} from "../../model/contacts/contacts-response";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contactsUrl = environment.contactsUrl;

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

  getContactsByCompany(companyId: string | null): Observable<any> {
    return this.httpClient.get(this.contactsUrl + "/list/" + companyId,
      {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getContactDetails(contactId: string): Observable<any> {
    return this.httpClient.get(this.contactsUrl + '/' + contactId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createContact(companyId: string, fullName: string,
                phoneNumber: string, email: string, position: string, note: string): Observable<any> {
    return this.httpClient.post(this.contactsUrl,
      {
        "companyId": companyId,
        "fullName": fullName,
        "phoneNumber": phoneNumber,
        "email": email,
        "position": position,
        "note": note
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  updateContact(contactId: string, fullName: string,
                phoneNumber: string, email: string, position: string, note:string): Observable<any>{
    return this.httpClient.put(this.contactsUrl + "/" + contactId,
      {
        "fullName": fullName,
        "phoneNumber": phoneNumber,
        "email": email,
        "position": position,
        "note": note
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  deleteContact(contactId: string): Observable<any>{
    return this.httpClient.delete(this.contactsUrl + '/' + contactId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
