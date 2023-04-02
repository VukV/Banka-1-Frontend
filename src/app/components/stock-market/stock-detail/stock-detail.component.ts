import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../model/stocks/stock";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeSeriesQueryEnum} from "../../../model/stocks/time-series-query-enum";
import {StockTimeSeries} from "../../../model/stocks/stock-time-series";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {Location} from "@angular/common";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

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
  timeSeriesQuery: TimeSeriesQueryEnum = TimeSeriesQueryEnum.MONTHLY;

  stockChart: any;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private router: Router, private stocksService: StocksService, private location: Location) { }

  ngOnInit(): void {
    this.getStockFromRoute();
    this.getTimeSeries();
    this.initChart([], []);
  }

  getStockFromRoute(){
    this.route.queryParams.subscribe(
      params => {
        this.stock = JSON.parse(params['stockData']);
      }
    )
  }

  initChart(dataList: any, labelList: any){
    this.stockChart = new Chart('stock-chart', {
      type: 'line',
      data: {
        labels: labelList,
        datasets: [{
          label: 'Cena',
          data: dataList,
          borderWidth: 1,
          borderColor: '#00B127FF',
        }]
      },
      options: {
        elements:{
          point: {
            radius: 0,
            hoverRadius: 6,
            hitRadius: 8
          }
        },
        scales: {
          y: {
            ticks: {
              color: "white",
              font: {
                size: 18,
              }
            },
            beginAtZero: false
          },
          x: {
            ticks: {
              color: "white"
            },
          }
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'white',
              font: {
                size: 18
              }
            }
          }
        }
      },
    });
  }

  getTimeSeries(){
    this.loadingTS = true;
    this.stocksService.getStockTimeSeries(this.stock!.symbol, this.timeSeriesQuery).subscribe(
      (data) => {
        this.stockTimeSeries = data;
        this.loadingTS = false;

        this.updateChart();
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

  getTSMin(){
    this.timeSeriesQuery = TimeSeriesQueryEnum.FIVE_MIN;
    this.getTimeSeries();
  }

  getTSHourly(){
    this.timeSeriesQuery = TimeSeriesQueryEnum.HOUR;
    this.getTimeSeries();
  }

  getTSDaily(){
    this.timeSeriesQuery = TimeSeriesQueryEnum.DAILY;
    this.getTimeSeries();
  }

  getTSWeekly(){
    this.timeSeriesQuery = TimeSeriesQueryEnum.WEEKLY;
    this.getTimeSeries();
  }

  getTSMonthly(){
    this.timeSeriesQuery = TimeSeriesQueryEnum.MONTHLY;
    this.getTimeSeries();
  }

  private updateChart(){
    let data: number[] = [];
    let labels = [];

    for(let ts in this.stockTimeSeries!.time_series){
      data.push(this.stockTimeSeries!.time_series[ts].high);
      labels.push(this.stockTimeSeries!.time_series[ts].date);
    }

    this.stockChart.destroy();
    this.initChart(data, labels);
  }

  refresh(): void {
    this.getStockData();
    this.getTimeSeries();
  }

  buySell(): void {
    this.router.navigate(['trades-stocks', this.stock!.symbol]);
  }

  seeOptions(): void {
    // TODO
  }

  close(): void {
    this.location.back()
  }

  onButtonGroupClick($event: any){
    let clickedElement = $event.target || $event.srcElement;

    if( clickedElement.nodeName === "BUTTON" ) {

      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");

      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }

      clickedElement.className += " active";
    }
  }

}
