import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../model/stocks/stock";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeSeriesQueryEnum} from "../../../model/stocks/time-series-query-enum";
import {StockTimeSeries} from "../../../model/stocks/stock-time-series";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {DOCUMENT, Location} from "@angular/common";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from // @ts-ignore
 "ng-apexcharts";
import * as ApexCharts from 'apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stocks-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;

  candleData: any = [];
  chartType: string = "basic";

  loadingTS: boolean = false;
  loadingStock: boolean = false;
  stock: Stock | undefined;
  stockTimeSeries: StockTimeSeries | undefined;
  timeSeriesQuery: TimeSeriesQueryEnum = TimeSeriesQueryEnum.MONTHLY;

  stockChart: any;
  apexChart: any;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private router: Router, private stocksService: StocksService, private location: Location, @Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
    this.getStockFromRoute();
    this.getTimeSeries();
    //this.initCandleChart([]);
    this.initChart([],[]);
  }

  getStockFromRoute(){
    this.route.queryParams.subscribe(
      params => {
        this.stock = JSON.parse(params['stockData']);
      }
    )
  }

  initCandleChart(candleData: any){
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: candleData,
        }
      ],
      chart: {
        type: "candlestick",
        height: 350,
        width: 600,
        background: "#FF"
      },
      title: {
        text: "",
        align: "left"
      },
      tooltip: {
        enabled: true,
        theme: "dark"
      },
      theme: {
        mode: "dark",
      },
      xaxis: {
        type: "category"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
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
            }
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

        if(this.chartType == "candle"){
          this.updateCandleChart();
        }
        else{
          this.updateChart();
        }

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

  toggleChartType(){
    if(this.chartType == "candle"){
      this.chartType = "basic";
    }
    else {
      this.chartType = "candle"
    }

    document.getElementById("monthButton")!.click()
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

  private updateCandleChart(){
    let datum: Date = new Date();
    let vrednosti: number[] = [];
    this.candleData = [];

    for(let ts in this.stockTimeSeries!.time_series) {
      datum = new Date(this.stockTimeSeries!.time_series[ts].date)
      vrednosti = [parseFloat(String(this.stockTimeSeries!.time_series[ts].open)),
        parseFloat(String(this.stockTimeSeries!.time_series[ts].high)),
        parseFloat(String(this.stockTimeSeries!.time_series[ts].low)),
        parseFloat(String(this.stockTimeSeries!.time_series[ts].close))]

      this.candleData.push({
        x: datum.toLocaleDateString(),
        y: vrednosti
      })

      if(+ts > 50){
        break;
      }
    }


    try {
      this.apexChart.destroy();
    }
    catch{
      console.log("No chart to destroy");
    }

    this.initCandleChart(this.candleData);
    this.apexChart = new ApexCharts(document.querySelector("#candle"), this.chartOptions);
    this.apexChart.render();
  }

  private updateChart(){
    let data: number[] = [];
    let labels = [];

    for(let ts in this.stockTimeSeries!.time_series){
      data.push(this.stockTimeSeries!.time_series[ts].high);
      labels.push(this.stockTimeSeries!.time_series[ts].date);

      if(+ts > 50){
        break;
      }
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
    this.router.navigate(['options', this.stock!.symbol]);
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
