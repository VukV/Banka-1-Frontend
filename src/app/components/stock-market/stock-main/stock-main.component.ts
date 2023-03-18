import {Component, OnInit, ViewChild} from '@angular/core';
import {ForexComponent} from "../forex/forex.component";

@Component({
  selector: 'app-stock-main',
  templateUrl: './stock-main.component.html',
  styleUrls: ['./stock-main.component.css']
})
export class StockMainComponent implements OnInit {

  @ViewChild(ForexComponent)
  forexComponent!: ForexComponent

  stockType: string
  flag: boolean

  constructor() {
    this.stockType = ''
    this.flag = false
  }

  ngOnInit(): void {
    this.flag = true
  }

  setStockType(stockType: string): void{
    this.stockType = stockType
  }

  resetFlag(): void{
    this.flag = false
  }
}
