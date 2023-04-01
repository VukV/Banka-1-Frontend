import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../model/stocks/stock";
import {Forex} from "../../../model/stocks/forex";
import {PopupComponent} from "../../popup/popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import {StocksService} from "../../../services/stocks/stocks.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-forex-detail',
  templateUrl: './forex-detail.component.html',
  styleUrls: ['./forex-detail.component.css']
})
export class ForexDetailComponent implements OnInit {
  currencyFromSymbol: string = "";
  currencyToSymbol: string = "";
  exchangeRate: number = -1;
  bid: number = -1;
  ask: number = -1;

  loadingTS: boolean = false;
  loadingForex: boolean = false;
  forex: Forex | undefined;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private route: ActivatedRoute, private router: Router, private stocksService: StocksService, private location: Location) { }

  ngOnInit(): void {
    this.getForexFromRoute();
  }

  getForexFromRoute(){
    this.route.queryParams.subscribe(
      params => {
        this.forex = JSON.parse(params['forexData']);
      }
    )
  }

  refresh(): void {
    // TODO
    this.getTimeSeries();
  }

  buySell(): void {
    this.router.navigate(['trades']);
  }

  close(): void {
    this.location.back()
  }

  getTimeSeries(){
    this.loadingTS = true;
  }

}
