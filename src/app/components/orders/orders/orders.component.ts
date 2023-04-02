import { Component, OnInit } from '@angular/core';
import {Order} from "../../../model/companies-contract-model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[]=[]
  options: string[] = ['Sve', 'Završene', 'Odobrene', 'Odbijene', 'Na čekanju']
  id: number=0
  hartija: string=""
  ukupno: string=""
  simbol: string=""
  kolicina: number=0
  cena: number=0
  status: string=""
  zavrsena: string=""
  modifikacija: any=''

  constructor() { }

  ngOnInit(): void {
  }

  refresh(){

  }
}
