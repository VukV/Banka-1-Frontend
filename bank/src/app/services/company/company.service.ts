import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {UserModel} from "../../model/user/user-model";
import {CompanyModel} from "../../model/account/company-model";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private bankUrl = environment.bankUrl;

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

  listCompaniesFilter(naziv: string, pib: string, maticniBroj: string, sifraDelatnosti: string): Observable<any> {
    return this.httpClient.post<any>(`${this.bankUrl}/companies_filtered`,
      {
        "companyName": naziv,
        "vatIdNumber": pib,
        "identificationNumber": maticniBroj,
        "activityCode": sifraDelatnosti
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  listCompanies(): Observable<any> {
    return this.httpClient.get<any>(`${this.bankUrl}/companies`,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }



  createCompany(companyName: string, phoneNumber: string, faxNumber: string, vatIdNumber: number, identificationNumber: number, activityCode: number,registryNumber:number): Observable<CompanyModel> {
    const companyCreationData = {
      companyName: companyName,
      phoneNumber: phoneNumber,
      faxNumber: faxNumber,
      vatIdNumber: vatIdNumber,
      identificationNumber: identificationNumber,
      activityCode: activityCode,
      registryNumber:registryNumber
    };
    return this.httpClient.post<CompanyModel>(`${this.bankUrl}/create_company`, companyCreationData, {
      headers: this.headers
    });
  }
}
