import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {OptionsService} from "../../../services/options/options.service";
import {Option} from "../../../model/stocks/stock";
import {OptionTypeEnum} from "../../../model/stocks/option-type-enum";

@Component({
  selector: 'app-option-trade-popup',
  templateUrl: './option-trade-popup.component.html',
  styleUrls: ['./option-trade-popup.component.css']
})
export class OptionTradePopupComponent {

  loading: boolean = false;
  error: string = "";
  displayStyle = "none";

  optionSymbol: string = '';
  optionStrike: number = 0;
  option: any;

  optionId: number = -1;
  selectedPrice: number = 0;
  selectedDate: Date | null = null;

  constructor(private optionsService: OptionsService, private router: Router) {
  }

  trade(){
    this.error = "";

    if(this.selectedPrice <= 0){
      this.error = "Izaberite ispravnu cenu";
      return;
    }

    if(this.selectedDate == null){
      this.error = "Izaberite datum";
      return;
    }

    if(this.selectedDate > this.option.expirationDate){
      this.error = "Datum ne može biti posle datuma isteka";
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDateWithoutTime = new Date(this.selectedDate);
    selectedDateWithoutTime.setHours(0, 0, 0, 0);
    if(selectedDateWithoutTime < today){
      this.error = "Datum ne može biti pre današnjeg";
      return;
    }

    this.loading = true;
    this.optionsService.tradeOption(this.optionId, this.selectedDate, this.selectedPrice).subscribe(
      (data) => {
        this.loading = false;
        this.goToOrders();
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      }
    )
  }

  cancel(){
    this.displayStyle = "none";
  }

  openPopup(option: Option){
    this.option = option;
    this.optionId = option.id;
    this.optionSymbol = option.symbol;
    this.optionStrike = option.strike;
    this.displayStyle = "block";
  }

  goToOrders(){
    this.router.navigate(['orders']);
  }

}
