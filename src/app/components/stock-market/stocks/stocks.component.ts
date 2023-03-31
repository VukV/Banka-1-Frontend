import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from "../../../model/stocks/stock";
import {StocksService} from "../../../services/stocks/stocks.service";
import {PopupComponent} from "../../popup/popup.component";
import {Router} from "@angular/router";

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
  stocksPerPage: number = 6;

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private stocksService: StocksService, private router: Router) { }

  ngOnInit(): void {
    this.listStocks()
  }

  listStocks(){
    this.loading = true;
    this.stocksService.getStocks(this.searchSymbol, this.page-1, this.stocksPerPage).subscribe(
      (data) => {
        this.stocks = data.content;
        this.totalPages = data.totalPages;
        this.totalStocks = data.totalElements;

        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  stockDetails(symbol: string){
    this.router.navigate(['stock-detail', symbol]);
  }

  pageChangeEvent(event: number){
    this.page = event;
    this.listStocks();
  }
}
