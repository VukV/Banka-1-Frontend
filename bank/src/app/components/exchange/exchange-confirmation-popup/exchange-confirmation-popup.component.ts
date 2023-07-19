import { Component } from '@angular/core';
import {ExchangeModel} from "../../../model/payments/exchange-model";
import {ExchangeResponse} from "../../../model/exchange/exchange";
import {ExchangeService} from "../../../services/exchange/exchange.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exchange-confirmation-popup',
  templateUrl: './exchange-confirmation-popup.component.html',
  styleUrls: ['./exchange-confirmation-popup.component.css']
})
export class ExchangeConfirmationPopupComponent {

  displayStyle = "none";
  loading: boolean = false;
  errorText: string = '';

  exchangePairSymbol: string = '';
  amount: number = 0;
  convertedAmount: number = 0;
  exchangeRate: number = 0;

  exchange: ExchangeResponse | any;

  constructor(private exchangeService: ExchangeService, private router: Router) {
  }

  openPopup(exchange: ExchangeResponse){
    this.displayStyle = "block";
    this.exchange = exchange;

    this.exchangePairSymbol = exchange.exchangePairSymbol;
    this.amount = exchange.amount;
    this.convertedAmount = exchange.convertedAmount;
    this.exchangeRate = exchange.exchangeRate;
  }

  closePopup() {
    this.displayStyle = "none"
  }

  confirmExchange(){
    this.loading = true;
    this.errorText = '';

    this.exchangeService.confirmExchange(this.exchange).subscribe({
      error: () => {
        this.loading = false;
        this.errorText = "Došlo je do greške! Pokušajte ponovo."
      },
      next: () => {
        this.loading = false;
        this.router.navigate(['exchange']);
      }
    });
  }

}
