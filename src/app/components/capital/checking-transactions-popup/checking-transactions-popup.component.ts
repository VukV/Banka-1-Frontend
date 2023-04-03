import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checking-transactions-popup',
  templateUrl: './checking-transactions-popup.component.html',
  styleUrls: ['./checking-transactions-popup.component.css']
})
export class CheckingTransactionsPopupComponent implements OnInit {

  displayStyle: string = "none"
  currency: string

  constructor() {
    this.currency = "USD"

  }

  ngOnInit(): void { }

  openPopUp(): void{
    this.displayStyle = "block"
  }

  closePopUp(): void{
    this.displayStyle = "none"
  }


}
