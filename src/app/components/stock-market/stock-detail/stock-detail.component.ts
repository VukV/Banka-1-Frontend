import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../model/stocks/stock";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeSeriesQueryEnum} from "../../../model/stocks/time-series-query-enum";
import {StockTimeSeries} from "../../../model/stocks/stock-time-series";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-stocks-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  formatter = new Intl.NumberFormat("en", { minimumFractionDigits: 1, notation: "compact" });

  symbol: string = "";
  name: string = "";
  price: number = -1;
  priceChangePercentage: number = -1;
  lastUpdate: Date = new Date();
  priceChange: number = -1;
  open: number = -1;
  low: number = -1;
  high: number = -1;
  previousClose: number = -1;
  dayRangeFrom: number = -1;
  dayRangeTo: number = -1;
  priceVolume: number = -1;
  volume: number = -1;
  outstandingShares: number = -1;
  marketCap: number = -1;

  loadingTS: boolean = false;
  loadingStock: boolean = false;
  stock: Stock | undefined;
  stockTimeSeries: StockTimeSeries | undefined;
  timeSeriesQuery: TimeSeriesQueryEnum = TimeSeriesQueryEnum.DAILY;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private router: Router, private stocksService: StocksService, private location: Location) { }

  ngOnInit(): void {
    this.getStockFromRoute();
    this.getTimeSeries();
  }

  getStockFromRoute(){
    this.route.queryParams.subscribe(
      params => {
        this.stock = JSON.parse(params['stockData']);
      }
    )
  }

  getTimeSeries(){
    this.loadingTS = true;
    this.stocksService.getStockTimeSeries(this.stock!.symbol, this.timeSeriesQuery).subscribe(
      (data) => {
        this.stockTimeSeries = data;
        this.loadingTS = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loadingTS = false;
      }
    )
  }

  getStockData(){

  }

  refresh(): void {
    this.getStockData();
    this.getTimeSeries();
  }

  buySell(): void {
    this.router.navigate(['trades']);
  }

  seeOptions(): void {
    // TODO
  }

  close(): void {
    this.location.back()
  }

}
