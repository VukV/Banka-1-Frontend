import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  stocksFormGroup!: FormGroup;

  errorMessage!: string;

  isBtnSellActive = false;
  isBtnBuyActive = true;
  toggleBtnValue = '';

  allOrNone = false;
  margin = false;

  symbol: string = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
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

  onButtonStocksSubmit() {

    if (this.stocksFormGroup.value.action != null && this.stocksFormGroup.value.action != "" &&
      this.stocksFormGroup.value.quantity != null && this.stocksFormGroup.value.quantity != "" &&
      this.stocksFormGroup.value.limit != null && this.stocksFormGroup.value.limit != "" &&
      this.stocksFormGroup.value.stop != null && this.stocksFormGroup.value.stop != ""
    ) {
      if (this.isBtnBuyActive) {
        this.toggleBtnValue = "buy";
      } else if (this.isBtnSellActive) {
        this.toggleBtnValue = "sell";
      }

      this.errorMessage = "";

      //POZIV SERVISA KA APIJU; SLANJE PODATAKA NA SERVICE

      this.router.navigate(['/'])
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }

  }

  onClickBuy() {
    this.isBtnBuyActive = true;
    this.isBtnSellActive = false;
  }

  onClickSell() {
    this.isBtnBuyActive = false;
    this.isBtnSellActive = true;
  }

}
