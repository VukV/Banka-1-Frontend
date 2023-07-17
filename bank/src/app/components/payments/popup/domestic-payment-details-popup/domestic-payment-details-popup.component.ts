import {Component, ViewChild} from '@angular/core';
import { PopupComponent } from 'src/app/components/popup/popup/popup.component';
import {PaymentService} from "../../../../services/payment/payment.service";
import {Router} from "@angular/router";
import {DomesticPaymentModel} from "../../../../model/payments/domestic-payments-model";
import {FormBuilder} from "@angular/forms";
import {ExchangeModel} from "../../../../model/payments/exchange-model";

@Component({
  selector: 'app-domestic-payment-details-popup',
  templateUrl: './domestic-payment-details-popup.component.html',
  styleUrls: ['./domestic-payment-details-popup.component.css']
})
export class DomesticPaymentDetailsPopupComponent {

  displayStyle = "none"
  loading: boolean = false

  reciever: string | null = ''
  recieverAccountNumber: string = ''
  amount: string = ''
  referenceNumber: string = ''
  paymentCode: string = ''
  paymentPurpose: string = ''
  model: string = ''

  constructor(private paymentService: PaymentService, private router: Router) { }

  ngOnInit(): void {
  }

  openPopup(domesticPayment: DomesticPaymentModel){
    this.displayStyle = "block";
    this.reciever = domesticPayment.recieverName
    this.recieverAccountNumber = domesticPayment.receiverAccountNumber
    this.amount = domesticPayment.amount
    this.referenceNumber = domesticPayment.referenceNumber
    this.paymentCode = domesticPayment.paymentNumber
    this.paymentPurpose = domesticPayment.paymentPurpose

  }

  closePopup() {
    this.displayStyle = "none";
  }

}
