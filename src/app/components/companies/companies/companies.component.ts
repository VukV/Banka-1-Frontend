import { Component, OnInit } from '@angular/core';
import {Company} from "../../../model/companies-contract-model";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = []
  id: number=0
  naziv: string=""
  PIB: number=0
  sifra: number=0
  adresa: string=""
  drzava: string=""
  constructor() { }

  ngOnInit(): void {
  }

}
