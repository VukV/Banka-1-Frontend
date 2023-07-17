import {Component, ViewChild} from '@angular/core';
import {PopupComponent} from "../../../popup/popup/popup.component";
import {PaymentService} from "../../../../services/payment/payment.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExchangeModel} from "../../../../model/payments/exchange-model";

@Component({
  selector: 'app-exchange-details-popup',
  templateUrl: './exchange-details-popup.component.html',
  styleUrls: ['./exchange-details-popup.component.css']
})
export class ExchangeDetailsPopupComponent {

  displayStyle = "none"
  loading: boolean = false

  senderAccountNumber: string | null = ''
  recieverAccountNumber: string | null = ''
  currency: string | null = ''
  amount: string | null = ''
  convertedAmount: string | null = ''
  exchangeRate: string | null = ''

  constructor(private paymentService: PaymentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  openPopup(exchange: ExchangeModel){
    this.displayStyle = "block"
    this.senderAccountNumber = exchange.senderAccountNumber
    this.recieverAccountNumber = exchange.receiverAccountNumber
    this.currency = exchange.exchangePairSymbol
    this.amount = exchange.amount
    this.convertedAmount = exchange.convertedAmount
    this.exchangeRate = exchange.exchangeRate
  }

  closePopup() {
    this.displayStyle = "none"
  }

}
