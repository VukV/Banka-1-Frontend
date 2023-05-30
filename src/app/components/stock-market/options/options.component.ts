import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PopupComponent} from "../../popup/popup/popup.component";
import {StocksService} from "../../../services/stocks/stocks.service";
import {Option} from "../../../model/stocks/stock";
import {OptionTypeEnum} from "../../../model/stocks/option-type-enum";
import {Location} from "@angular/common";
import {OptionsService} from "../../../services/options/options.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  symbol: string = "";
  expirationDate: Date | null = null;
  loading: boolean = false;
  optionHeader: string = "Calls";
  isCall: boolean = true;

  callOptions: Option[] = [];
  putOptions: Option[] = [];

  options: Option[] = [];

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private optionsService: OptionsService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.getOptions()
    });
  }

  setOptionCalls(){
    this.optionHeader = "Calls";
    this.options = this.callOptions;
    this.isCall = true;
  }

  setOptionPuts(){
    this.optionHeader = "Puts";
    this.options = this.putOptions;
    this.isCall = false;
  }

  getOptions(){
    this.loading = false;
    this.optionsService.getOptions(this.expirationDate, this.symbol).subscribe(
      (data) => {
        this.callOptions = data.filter((option: Option) => option.optionType == OptionTypeEnum.CALL).sort((o1: Option, o2: Option) => o1.strike - o2.strike);
        this.putOptions = data.filter((option: Option) => option.optionType == OptionTypeEnum.PUT).sort((o1: Option, o2: Option) => o1.strike - o2.strike);

        if(this.isCall){
          this.options = this.callOptions;
        }
        else {
          this.options = this.putOptions;
        }

        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  openTradeOption(option: Option){

  }

  backClick(){
    this.location.back();
  }

}
