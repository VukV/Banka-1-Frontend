import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-margin-transactions-popup',
  templateUrl: './margin-transactions-popup.component.html',
  styleUrls: ['./margin-transactions-popup.component.css']
})
export class MarginTransactionsPopupComponent implements OnInit {

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
