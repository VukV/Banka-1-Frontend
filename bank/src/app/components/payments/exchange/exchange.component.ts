import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {PaymentService} from "../../../services/payment/payment.service";
import {Router} from "@angular/router";
import {ExchangeModel} from "../../../model/payments/exchange-model";
import {ExchangeDetailsPopupComponent} from "../popup/exchange-details-popup/exchange-details-popup.component";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnChanges {
  @Input() expectedProp: any | undefined

  exchangeList: ExchangeModel[] = []
  exchangePair: string = ""
  type: string = ""

  totalPages: number = 0
  totalExchanges: number = 0
  page: number = 1
  exchangesPerPage: number = 6

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(ExchangeDetailsPopupComponent)
  echangeDetailsPopupComponent!: ExchangeDetailsPopupComponent;

  constructor(private paymentsService: PaymentService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.expectedProp.date != '')
      this.exchangeList =
        this.exchangeList.filter(x => {
          var itemDate = new Date(x.conversionTime);
          var filterDate = new Date(this.expectedProp?.date);
          itemDate.setHours(0,0,0,0)
          filterDate.setHours(0,0,0,0)
          return itemDate == filterDate
      })

  }

  ngOnInit(): void {
    this.getExchangeList()
  }

  getExchangeList(){
    this.loading = true;
    this.paymentsService.getExchanges(this.page-1, this.exchangesPerPage).subscribe(
      (data) => {
        this.exchangeList = data;
        this.totalPages = data.totalPages;
        this.totalExchanges = data.totalElements;

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
    this.getExchangeList();
  }

  exchangeDetailsPopup(exchange: ExchangeModel){
    this.echangeDetailsPopupComponent.openPopup(exchange)
  }


}
