import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {DatePipe} from "@angular/common";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {ContractRequest} from "../../model/contracts/contract-request";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private companiesUrl = environment.companiesUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient, private currentUserService: CurrentUserService, private datePipe: DatePipe) {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.headers = new HttpHeaders({
          'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
        });
      }
    });
  }

  getCompanies(name: string, registrationNumber: string, taxNumber: string): Observable<any> {
    let queryParams = new HttpParams();
    if (name != "") {
      queryParams = queryParams.append("name", name);
    }
    if (registrationNumber != "") {
      queryParams = queryParams.append("registrationNumber", registrationNumber);
    }
    if (taxNumber != "") {
      queryParams = queryParams.append("taxNumber", taxNumber);
    }
    return this.httpClient.get(this.companiesUrl,
      {
        headers: this.headers,
        params: queryParams
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    );
  }

    getCompanyById(companyId: string | null): Observable<any> {
    return this.httpClient.get(this.companiesUrl + "/" + companyId,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message))
      })
    );
  }

  postCompany(name: string, registrationNumber: string, taxNumber: string, activityCode: string, address: string): Observable<any> {
    return this.httpClient.post(this.companiesUrl, {
      "name": name,
      "registrationNumber": registrationNumber,
      "taxNumber": taxNumber,
      "activityCode": activityCode,
      "address": address
    }, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  updateCompany(_id: string, name: string, activityCode: string, address: string): Observable<any> {
    return this.httpClient.put(this.companiesUrl + "/" + _id, {
        "name": name,
        "activityCode": activityCode,
        "address": address
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  deleteCompany(_id: string): Observable<any> {
    return this.httpClient.delete(this.companiesUrl + '/' + _id, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
