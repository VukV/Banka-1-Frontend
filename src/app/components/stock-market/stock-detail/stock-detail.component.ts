import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void { }

  refresh(): void {
    // TODO
  }

  buy(): void {
    // TODO
  }

  sell(): void {
    // TODO
  }

  seeOptions(): void {
    // TODO
  }

  close(): void {
    // TODO
  }
}
