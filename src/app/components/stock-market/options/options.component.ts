import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PopupComponent} from "../../popup/popup/popup.component";
import {StocksService} from "../../../services/stocks/stocks.service";
import {Option} from "../../../model/stocks/stock";
import {OptionTypeEnum} from "../../../model/stocks/option-type-enum";
import {Location} from "@angular/common";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  symbol: string = "";
  expirationDate: Date | null = null;
  loading: boolean = false;
  optionPairs: [Option, Option][] = []

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private stocksService: StocksService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.getOptions()
    });
  }

  getOptions(){
    this.optionPairs = [];
    this.loading = false;
    this.stocksService.getOptions(this.expirationDate, this.symbol).subscribe(
      (data) => {
        let callOptions = data.filter((option: Option) => option.optionType == OptionTypeEnum.CALL)
          .sort((option1: Option, option2: Option) => option1.strike >= option2.strike ? 1 : -1);
        let putOptions = data.filter((option: Option) => option.optionType == OptionTypeEnum.PUT);
        for (let callOption of callOptions) {
          let putOption = putOptions.filter((option: Option) => option.strike == callOption.strike &&
            option.openInterest == callOption.openInterest && option.expirationDate == callOption.expirationDate)[0];
          this.optionPairs.push([callOption, putOption]);
          putOptions = putOptions.filter((option: Option) => option !== putOption);
        }
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  backClick(){
    this.location.back();
  }

}
