import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrentUserService} from "../user/current-user.service";
import {catchError, Observable, throwError} from "rxjs";
import {Contract} from "../../model/contracts/contract";
import {ContractRequest} from "../../model/contracts/contract-request";

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  private contractsUrl = environment.contractsUrl;
  private contractsFinalisedUrl = environment.contractsUrl + '/finalised';

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

  getContracts(): Observable<any>{
    return this.httpClient.get(this.contractsUrl, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getAgentContracts(): Observable<any>{
    return this.httpClient.get(this.contractsUrl + '/my-contracts', {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getContract(contractId: string): Observable<any> {
    return this.httpClient.get(this.contractsUrl + '/' + contractId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getContractByCompany(companyId: number): Observable<any> {
    return this.httpClient.get(this.contractsUrl + '/company-contracts/' + companyId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  createContract(createContractRequest: ContractRequest): Observable<any> {
    return this.httpClient.post(this.contractsUrl,
      createContractRequest,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  updateContract(contractId: string, updateContractRequest: ContractRequest): Observable<any>{
    return this.httpClient.put(this.contractsUrl + "/" + contractId,
      updateContractRequest,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  deleteContract(contractId: string): Observable<any>{
    return this.httpClient.delete(this.contractsUrl + '/' + contractId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  downloadContract(contractId: string): Observable<any>{
    return this.httpClient.get(this.contractsFinalisedUrl + '/' + contractId, {
      headers: this.headers.append('Content-Type', 'application/pdf'),
      responseType: 'blob'
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  finaliseContract(formData: FormData): Observable<any>{
    return this.httpClient.post(this.contractsFinalisedUrl ,
      formData,
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

}
