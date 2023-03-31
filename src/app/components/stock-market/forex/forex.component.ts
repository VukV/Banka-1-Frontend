import {Component, OnInit, ViewChild} from '@angular/core';
import {ForexService} from "../../../services/stocks/forex.service";
import {Router} from "@angular/router";
import {PopupComponent} from "../../popup/popup.component";
import {Forex} from "../../../model/stocks/forex";

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {

  forexList: Forex[] = [];

  fromCurrencyCode: string = "";
  toCurrencyCode: string = "";

  totalPages: number = 0;
  totalForex: number = 0;
  page: number = 1;
  forexPerPage: number = 6;

  loading: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private forexService: ForexService, private router: Router) {
  }

  ngOnInit(): void {
  }

  listForex(){
    this.loading = true;
  }

  forexDetails(){

  }

  pageChangeEvent(event: number){
    this.page = event;
    this.listForex();
  }

}
