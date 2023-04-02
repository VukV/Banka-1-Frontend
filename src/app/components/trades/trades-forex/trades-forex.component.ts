import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderActionEnum} from "../../../model/orders/order-action-enum";
import {OrderTypeEnum} from "../../../model/orders/order-type-enum";
import {ListingTypeEnum} from "../../../model/orders/listing-type-enum";
import {PopupComponent} from "../../popup/popup.component";
import {MakeOrderRequest} from "../../../model/orders/make-order-request";
import {OrdersService} from "../../../services/orders/orders.service";

@Component({
  selector: 'app-trades-forex',
  templateUrl: './trades-forex.component.html',
  styleUrls: ['./trades-forex.component.css']
})
export class TradesForexComponent implements OnInit {

  forexFormGroup!: FormGroup;

  errorMessage!: string;
  loading: boolean = false;

  allOrNone = false;
  selectedCurrency1 = "";
  selectedCurrency2 = "";

  symbol: string = "";
  orderAction: OrderActionEnum = OrderActionEnum.BUY;
  orderType: OrderTypeEnum = OrderTypeEnum.MARKET_ORDER;
  listingType: ListingTypeEnum = ListingTypeEnum.FOREX;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.forexFormGroup = this.formBuilder.group({
      quantity: ['', Validators.required],
      limit: ['', Validators.required],
      stop: ['', Validators.required],
      selectedCurrency1: ['', Validators.required],
      selectedCurrency2: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.selectedCurrency1 = params['fromC'];
      this.selectedCurrency2 = params['toC'];
      this.symbol = this.selectedCurrency1 + '/' + this.selectedCurrency2;
    });
  }

  onButtonForexSubmit() {
    if(this.forexFormGroup.value.quantity != null && this.forexFormGroup.value.quantity != "" &&
      this.forexFormGroup.value.limit != null && this.forexFormGroup.value.limit != "" &&
      this.forexFormGroup.value.stop != null && this.forexFormGroup.value.stop != ""
    ){

      if(this.forexFormGroup.value.quantity < 1){
        this.errorMessage = 'Neispravan unos količine!';
        return;
      }

      this.forexFormGroup.value.quantity = Math.trunc(this.forexFormGroup.value.quantity);

      this.errorMessage = "";
      this.makeOrder();
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }
  }

  makeOrder(){
    this.loading = true;

    let makeOrderRequest = new MakeOrderRequest(this.symbol,  this.listingType, this.forexFormGroup.value.quantity,
      this.orderAction, this.orderType, this.forexFormGroup.value.limit, this.forexFormGroup.value.stop, this.allOrNone, false
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
