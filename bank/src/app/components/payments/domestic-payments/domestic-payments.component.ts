import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {Router} from "@angular/router";
import {PaymentService} from "../../../services/payment/payment.service";
import {DomesticPaymentModel} from "../../../model/payments/domestic-payments-model";
import {
  DomesticPaymentDetailsPopupComponent
} from "../popup/domestic-payment-details-popup/domestic-payment-details-popup.component";

@Component({
  selector: 'app-domestic-payments',
  templateUrl: './domestic-payments.component.html',
  styleUrls: ['./domestic-payments.component.css']
})
export class DomesticPaymentsComponent implements OnChanges{
  @Input() expectedProp: any | undefined

  domesticPayments: DomesticPaymentModel[] = []
  status: string = "Realizovano"

  totalPages: number = 0
  totalDomesticPayments: number = 0
  page: number = 1
  domesticPaymentsPerPage: number = 6

  loading: boolean = false;

  @ViewChild(DomesticPaymentDetailsPopupComponent)
  domesticPaymentPopupComponent!: DomesticPaymentDetailsPopupComponent;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private paymentsService: PaymentService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.expectedProp.date != '')
      this.domesticPayments =
        this.domesticPayments.filter(x => {
          var itemDate = new Date(x.paymentTime);
          var filterDate = new Date(this.expectedProp?.date);
          itemDate.setHours(0,0,0,0)
          filterDate.setHours(0,0,0,0)
          return itemDate == filterDate
        })

    if(this.expectedProp.status != 'Status' && this.expectedProp.status != 'Sve transakcije')
      this.domesticPayments =
        this.domesticPayments.filter(x => this.expectedProp.status.toLower() == "realizovano")  // kad se doda na beku
  }

  ngOnInit(): void {
    this.getAllDomesticPayments()
  }

  getAllDomesticPayments(){
    this.loading = true;
    this.paymentsService.getDomesticPayments(this.page-1, this.domesticPaymentsPerPage).subscribe(
      (data) => {
        this.domesticPayments = data;
        this.totalPages = data.totalPages;
        this.totalDomesticPayments = data.totalElements;

        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  pageChangeEvent(event: number){
    this.page = event;
    this.getAllDomesticPayments();
  }

  paymentDetailsPopup(domesticPayment: DomesticPaymentModel) {
    this.domesticPaymentPopupComponent.openPopup(domesticPayment)
  }

}
