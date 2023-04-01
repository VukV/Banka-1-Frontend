import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../model/stocks/stock";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeSeriesQueryEnum} from "../../../model/stocks/time-series-query-enum";
import {StockTimeSeries} from "../../../model/stocks/stock-time-series";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup.component";
import {Location} from "@angular/common";
import {Chart} from "chart.js";

@Component({
  selector: 'app-stocks-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

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
    this.initChart();
  }

  getStockFromRoute(){
    this.route.queryParams.subscribe(
      params => {
        this.stock = JSON.parse(params['stockData']);
      }
    )
  }

  initChart(){
    this.getTimeSeries();

    //TODO init chart
    let myChart = new Chart('stock-chart', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Current Vallue',
          data: [0, 20, 40, 50],
          backgroundColor: "rgb(115 185 243 / 65%)",
          borderColor: "#007ee7",
          fill: true,
        },
          {
            label: 'Invested Amount',
            data: [0, 20, 40, 60, 80],
            backgroundColor: "#47a0e8",
            borderColor: "#007ee7",
            fill: true,
          }],
        labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
      },
    });
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
    this.loadingStock = true;
    this.stocksService.getStock(this.stock!.id).subscribe(
      (data) => {
        this.stock = data;
        this.loadingStock = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loadingStock = false;
      }
    )
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
