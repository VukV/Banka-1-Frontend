import {Component, Input, ViewChild} from '@angular/core';
import {DomesticPaymentModel, PaymentModel} from "../../../model/payments/domestic-payments-model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {FormControl} from "@angular/forms";
import {PopupComponent} from "../../popup/popup/popup.component";
import {
  DomesticPaymentDetailsPopupComponent
} from "../popup/domestic-payment-details-popup/domestic-payment-details-popup.component";
import {ExchangeDetailsPopupComponent} from "../popup/exchange-details-popup/exchange-details-popup.component";
import {DatePipe} from "@angular/common";
import {PaymentService} from "../../../services/payment/payment.service";
import {HttpClient} from "@angular/common/http";
import {ExchangeModel} from "../../../model/payments/exchange-model";

@Component({
  selector: 'app-payment-recap',
  templateUrl: './payment-recap.component.html',
  styleUrls: ['./payment-recap.component.css'],
})
export class PaymentRecapComponent {
  reviewType: string
  status: string = "Status"
  date: string = ""
  option: any
  isDateValid: boolean = false
  formattedDate!: string | null

  payments!: DomesticPaymentModel[]
  exchanges!: ExchangeModel[]

  page: number = 1;
  receiversPerPage: number = 6;
  totalPages: number = 0;
  currentPage: number = 1;
  totalReceivers: number = 0;

  loading: boolean = false;

  childInput: object = {  }

  @ViewChild(DomesticPaymentDetailsPopupComponent)
  dpPopup!: DomesticPaymentDetailsPopupComponent

  @ViewChild(ExchangeDetailsPopupComponent)
  exchangePopup!: ExchangeDetailsPopupComponent

  @ViewChild(PopupComponent)
  popup!: PopupComponent

  constructor(private datePipe: DatePipe, private paymentService: PaymentService, private httpClient: HttpClient) {
    this.reviewType = ''
    this.status = ''
  }

  ngOnInit(){
  }

  setReviewType(type: string) {
    this.reviewType = type
  }

  setStatus(status: string){
    this.status = status
  }

  checkDate(date: Date){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateWithoutTime = new Date(date);
    if(selectedDateWithoutTime > today){
      this.popup.openPopup("Izabrani datum nije validan");
      this.isDateValid = false
    }else{
      this.isDateValid = true
    }

  }

  formatDate() {
    this.formattedDate = this.datePipe.transform(this.date, 'dd/MM/yyyy HH:mm:ss');
  }

  search() {
    this.childInput = {status: this.status, date: this.date}
    console.log("SET")
  }





}
