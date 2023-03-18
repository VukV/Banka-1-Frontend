import {Component, OnInit} from '@angular/core';
import {StocksEnum} from "../../../model/stocks-enum";

@Component({
  selector: 'app-trades-main',
  templateUrl: './trades-main.component.html',
  styleUrls: ['./trades-main.component.css']
})
export class TradesMainComponent implements OnInit {

  enumStocks = StocksEnum;
  vrAction: string = this.enumStocks.STOCKS;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.vrAction);
  }

  onSelected() {
    console.log("Vrednost: " + this.vrAction)
  }
}
