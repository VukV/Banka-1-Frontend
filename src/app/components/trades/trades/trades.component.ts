import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MakeOrderRequest} from "../../../model/orders/make-order-request";
import {ListingTypeEnum} from "../../../model/orders/listing-type-enum";
import {OrderActionEnum} from "../../../model/orders/order-action-enum";
import {OrderTypeEnum} from "../../../model/orders/order-type-enum";
import {OrdersService} from "../../../services/orders/orders.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {ConfirmationPopupComponent} from "../../popup/confirmation-popup/confirmation-popup.component";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  stocksFormGroup!: FormGroup;

  errorMessage!: string;
  loading: boolean = false;

  isBtnSellActive = false;
  isBtnBuyActive = true;
  toggleBtnValue = '';

  allOrNone = false;
  margin = false;

  symbol: string = "";
  orderAction: OrderActionEnum = OrderActionEnum.BUY;
  orderType: OrderTypeEnum = OrderTypeEnum.MARKET_ORDER;
  listingType: ListingTypeEnum = ListingTypeEnum.STOCK;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(ConfirmationPopupComponent)
  confirmationPopupComponent!: ConfirmationPopupComponent;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.stocksFormGroup = this.formBuilder.group({
      action: ['', Validators.required],
      quantity: ['', Validators.required],
      limit: ['', Validators.required],
      stop: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
          this.symbol = params['symbol'];
          console.log(this.symbol);
    });
  }

  onConfirmEvent(eventData: { confirmed: boolean }){
    if(eventData.confirmed){
      this.makeOrder();
    }
  }

  onButtonStocksSubmit() {
    if(this.stocksFormGroup.value.quantity != null && this.stocksFormGroup.value.quantity != ""){
      if(this.stocksFormGroup.value.quantity < 1){
        this.errorMessage = 'Neispravan unos količine!';
        return;
      }

      if(this.stocksFormGroup.value.limit != null && this.stocksFormGroup.value.limit != ""){
        if(this.stocksFormGroup.value.limit < 0){
          this.errorMessage = 'Neispravan unos limita!';
          return;
        }
      }

      if(this.stocksFormGroup.value.stop != null && this.stocksFormGroup.value.stop != ""){
        if(this.stocksFormGroup.value.stop < 0){
          this.errorMessage = 'Neispravan unos za stop!';
          return;
        }
      }

      this.stocksFormGroup.value.quantity = Math.trunc(this.stocksFormGroup.value.quantity);

      if (this.isBtnBuyActive) {
        this.toggleBtnValue = "buy";
      } else if (this.isBtnSellActive) {
        this.toggleBtnValue = "sell";
      }

      this.errorMessage = "";
      this.confirmationPopupComponent.openPopup();
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }
  }

  onClickBuy() {
    this.isBtnBuyActive = true;
    this.isBtnSellActive = false;
    this.orderAction = OrderActionEnum.BUY;
  }

  onClickSell() {
    this.isBtnBuyActive = false;
    this.isBtnSellActive = true;
    this.orderAction = OrderActionEnum.SELL;
  }

  makeOrder(){
    this.loading = true;

    let limit = this.stocksFormGroup.value.limit;
    let stop = this.stocksFormGroup.value.stop;

    if(limit != null && limit != "" && stop != null && stop != ""){
      this.orderType = OrderTypeEnum.STOP_LIMIT_ORDER;
    }
    else if(limit != null && limit != ""){
      this.orderType = OrderTypeEnum.LIMIT_ORDER;
    }
    else if(stop != null && stop != ""){
      this.orderType = OrderTypeEnum.STOP_ORDER;
    }

    let makeOrderRequest = new MakeOrderRequest(this.symbol,  this.listingType, this.stocksFormGroup.value.quantity,
      this.orderAction, this.orderType, limit, stop, this.allOrNone, this.margin
    );

    this.ordersService.makeOrder(makeOrderRequest).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/orders'])
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

}
