import {Component, OnInit, ViewChild} from '@angular/core';
import {Forex} from "../../../model/stocks/forex";
import {PopupComponent} from "../../popup/popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {TimeSeriesQueryEnum} from "../../../model/stocks/time-series-query-enum";
import {Chart, registerables} from "chart.js";
import {ForexService} from "../../../services/stocks/forex.service";

Chart.register(...registerables);

@Component({
  selector: 'app-forex-detail',
  templateUrl: './forex-detail.component.html',
  styleUrls: ['./forex-detail.component.css']
})
export class ForexDetailComponent implements OnInit {

  loadingTS: boolean = false;
  loadingForex: boolean = false;
  forex: Forex | undefined;
  timeSeriesQuery: TimeSeriesQueryEnum = TimeSeriesQueryEnum.MONTHLY;
  forexTimeSeries: any;

  forexChart: any;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private router: Router, private forexService: ForexService, private location: Location) { }

  ngOnInit(): void {
    this.getForexFromRoute();
    this.getTimeSeries();
    this.initChart([], []);
  }

  getForexFromRoute(){
    this.route.queryParams.subscribe(
      params => {
        this.forex = JSON.parse(params['forexData']);
      }
    )
  }

  getTimeSeries(){
    this.loadingTS = true;
    this.forexService.getForexTimeSeries(this.forex!.fromCurrency.currencyCode, this.forex!.toCurrency.currencyCode, this.timeSeriesQuery).subscribe(
      (data) => {
        this.forexTimeSeries = data;
        this.loadingTS = false;

        this.updateChart();
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loadingTS = false;
      }
    )
  }

  initChart(dataList: any, labelList: any){
    this.forexChart = new Chart('forex-chart', {
      type: 'line',
      data: {
        labels: labelList,
        datasets: [{
          label: 'Kurs',
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

  refresh(): void {
    this.getTimeSeries();
  }

  buySell(): void {
    this.router.navigate(['trades']);
  }

  close(): void {
    this.location.back()
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

    for(let ts in this.forexTimeSeries.time_series){
      data.push(this.forexTimeSeries.time_series[ts].high);
      labels.push("");
    }

    this.forexChart.destroy();
    this.initChart(data, labels);
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
