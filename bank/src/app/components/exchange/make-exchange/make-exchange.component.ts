import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {ExchangeService} from "../../../services/exchange/exchange.service";
import {AccountService} from "../../../services/account/account.service";
import {AccountModel} from "../../../model/payments/account-model";
import {
  ExchangeDetailsPopupComponent
} from "../../payments/popup/exchange-details-popup/exchange-details-popup.component";
import {ExchangeConfirmationPopupComponent} from "../exchange-confirmation-popup/exchange-confirmation-popup.component";

@Component({
  selector: 'app-exchange',
  templateUrl: './make-exchange.component.html',
  styleUrls: ['./make-exchange.component.css']
})
export class MakeExchangeComponent implements OnInit{

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(ExchangeConfirmationPopupComponent)
  exchangeConfirmation!: ExchangeConfirmationPopupComponent;

  loading: boolean = false;
  errorText: string = "";

  accounts: any[] = [];
  selectedAccountNumber: string = "";
  selectedAccount: any;

  amount: number = 0;
  selectedFrom: string = "";
  selectedFromAmount: number = 0;
  selectedTo: string = "";
  selectedToAmount: number = 0;

  ngOnInit(): void {
    this.getAccounts();
  }

  constructor(private exchangeService: ExchangeService, private accountService: AccountService) {
  }

  getAccounts(){
    this.loading = true;

    this.accountService.getAllAccountsForLoggedInUser().subscribe({
      error: (error) => {
        this.loading = false;
        this.popupComponent.openPopup(error.message)
      },
      next: (data) => {
        this.cleanUpAccounts(data);
        this.loading = false;
      }
    });
  }

  private cleanUpAccounts(data: any[]){
    this.accounts = data.filter((acc) => acc.accountType === 'FOREIGN_CURRENCY');

    this.selectedAccount = this.accounts[0];
    this.selectedAccountNumber = this.accounts[0].accountNumber;
  }

  selectAccount(selectedAccount: any){
    this.selectedAccountNumber = selectedAccount.accountNumber;
    this.selectedAccount = selectedAccount;
  }

  selectFrom(from: any){
    this.selectedFrom = from.foreignCurrencyCode;
    this.selectedFromAmount = from.accountBalance;
  }

  selectTo(to: any){
    this.selectedTo = to.foreignCurrencyCode;
    this.selectedToAmount = to.accountBalance;
  }

  continueWithExchange(){
    this.errorText = '';

    if(this.selectedAccountNumber == ''){
      this.errorText = 'Odaberite račun!';
      return;
    }
    if(this.selectedTo == '' || this.selectedFrom == ''){
      this.errorText = 'Izaberite valute!';
      return;
    }
    if(this.amount <= 0){
      this.errorText = 'Unesite iznos!';
      return;
    }

    this.exchangeService.initExchange(this.selectedAccountNumber, this.selectedFrom, this.selectedTo, this.amount).subscribe({
      error: (error) => {
      this.loading = false;
      this.popupComponent.openPopup(error.message)
    },
      next: (data) => {
      this.loading = false;
      this.exchangeConfirmation.openPopup(data);
    }
  });
}

}
