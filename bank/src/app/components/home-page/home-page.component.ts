import {Component, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Location} from "@angular/common";
import {AccountService} from "../../services/account/account.service";
import {AccountModel} from "../../model/account/accounts-model";
import {CurrencyService} from "../../services/currency/currency.service";
import {PopupComponent} from "../popup/popup/popup.component";
import {TransactionModel} from "../../model/account/transaction-model";
import {PaymentReceiver} from "../../model/account/PaymentReceiver";
import {waitForAsync} from "@angular/core/testing";
import {UserModel} from "../../model/user/user-model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  availableFunds!: number[];
  accounts: AccountModel[] = [];
  error: string = "";
  selectedAccount!: AccountModel;

  //Kalkulator
  amount1: number = 0;
  amount2: number = 0;
  allCurrencies: string[] = [];
  currency1: string = "RSD";
  currency2: string = "EUR";

  convertResponse: any;
  transactions: TransactionModel[] = [];
  receivers: PaymentReceiver[] = [];

  constructor(private userService: UserService, private currencyService: CurrencyService, private accountService: AccountService, private location: Location) {
  }

  ngOnInit(): void {
    this.allCurrencies = ['RSD', 'EUR', 'CHF', 'USD', 'GBD', 'JPY', 'CAD', 'AUD'];

    this.getAllAccountsForLoggedInUser()

    this.getAllPaymentReceiversForLoggedInUser()

  }

  onAccSelected(account: AccountModel) {

    if (account) {
      const selectedAccId = account.id.toString()
      console.log("accsel: " + selectedAccId)
      this.getAllTransactionsForAccount(selectedAccId)
    }
  }

  private getAllAccountsForLoggedInUser() {
    this.accountService.getAllAccountsForLoggedInUser().subscribe({
      error: (error) => {
        this.popupComponent.openPopup(error.message)

      },
      next: (allAccountsForLoggedInUser: any[]) => {
        this.accounts = allAccountsForLoggedInUser;

        this.selectedAccount = this.accounts[0]
        this.error = "";
        if (this.selectedAccount) {
          this.getAllTransactionsForAccount(this.selectedAccount.id.toString());
        }
      }
    });
  }

  private getAllTransactionsForAccount(selectedAccountId: string) {
    this.accountService.getAllTransactionsForAccount(selectedAccountId).subscribe({
      error: (error) => {
        this.popupComponent.openPopup(error.message)

      },
      next: (allTransactionsForAccount: any[]) => {

        this.transactions = allTransactionsForAccount.slice(0, 5);
        this.getAvailableFunds()

        this.error = "";
      }
    });
  }

  private getAvailableFunds() {
    this.availableFunds = this.selectedAccount?.accountBalance || 0;
  }

  calculate(): void {
    if(this.amount1 <= 0){
      return;
    }

    console.log('Performing calculation...');
    this.currencyService.convertMoney(this.amount1, this.currency1, this.currency2)
      .subscribe({
          next: (res) => {
            this.convertResponse = res;
            this.amount2 = res.convertedAmount.toFixed(3);
          },
          error: (error) => {
            this.popupComponent.openPopup(`Kalkulator nije uspeo: ${error.error.message}`)
          }
        }
      );
  }

  private getAllPaymentReceiversForLoggedInUser() {
    this.accountService.getAllPaymentReceiversForLoggedInUser().subscribe({
      error: (error) => {
        this.popupComponent.openPopup(error.message)

      },
      next: (AllPaymentReceiversForLoggedInUser: any[]) => {
        this.receivers = AllPaymentReceiversForLoggedInUser;
        this.error = "";
      }
    });
  }

  createNewReceiver() {

  }
}
