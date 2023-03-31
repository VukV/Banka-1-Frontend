import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../model/stocks/stock";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup.component";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: Stock[] = [];
  searchSymbol: string = "";

  totalPages: number = 0;
  totalStocks: number = 0;
  page: number = 1;
  stocksPerPage: number = 10;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private stocksService: StocksService) { }

  ngOnInit(): void {
    this.listStocks()
  }

  listStocks(){
    this.stocksService.getStocks(this.searchSymbol, this.page-1, this.stocksPerPage).subscribe(
      (data) => {
        this.stocks = data.content;
        this.totalPages = data.totalPages;
        this.totalStocks = data.totalElements;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
      }
    )
  }

  pageChangeEvent(event: number){
    this.page = event;
    this.listStocks();
  }
}
