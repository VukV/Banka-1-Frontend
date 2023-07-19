import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {ExchangeHistory, ExchangePair} from "../../../model/exchange/ExchangePair";
import {ExchangeService} from "../../../services/exchange/exchange.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit{

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  loading: boolean = false;

  exchangeRates: ExchangePair[] = [];
  exchangeHistory: ExchangeHistory[] = [];

  constructor(private exchangeService: ExchangeService, private router:Router) {
  }

  ngOnInit(): void {
    this.getExchangeRates();
    this.getExchangeHistory();
  }

  getExchangeRates(){
    this.loading = true;

    this.exchangeService.getExchangeRates().subscribe({
        error: (error) => {
          this.loading = false;
          this.popupComponent.openPopup(error.message)
        },
        next: (data) => {
          this.exchangeRates = data;
          this.loading = false;
        }
    });
  }

  getExchangeHistory(){
    this.loading = true;

    this.exchangeService.getExchangeHistory().subscribe({
      error: (error) => {
        this.loading = false;
        this.popupComponent.openPopup(error.message)
      },
      next: (data) => {
        this.exchangeHistory = data;
        this.loading = false;
      }
    });
  }

  goToExchanges(){
    this.router.navigate(['make-exchange'])
  }

}
