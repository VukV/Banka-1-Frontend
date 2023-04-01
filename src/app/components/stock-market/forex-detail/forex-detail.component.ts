import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void { }

  refresh(): void {
    // TODO
  }

  buySell(): void {
    // TODO
  }

  close(): void {
    // TODO
  }

}
