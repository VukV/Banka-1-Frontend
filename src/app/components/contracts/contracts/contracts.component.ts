import { Component, OnInit } from '@angular/core';
import {Contract} from "../../../model/companies-contract-model";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  contracts: Contract [] = []
  id: number = 0
  delovodniBroj: string=""
  status: string=""
  kreiran: any=''
  izmenjen: any=''
  constructor() { }

  ngOnInit(): void {
  }

}
