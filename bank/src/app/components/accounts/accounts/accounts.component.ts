import {Component, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AccountService} from "../../../services/account/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountDetailComponent} from "./account-details/account-detail/account-detail.component";
import {AccountModel} from "../../../model/account/accounts-model";
import {UserModel} from "../../../model/user/user-model";
import {CurrencyModel} from "../../../model/account/currency-model";
import {UserPositionEnum} from "../../../model/user/user-position-enum";
import {UserRoleEnum} from "../../../model/user/user-role-enum";
import {PopupComponent} from "../../popup/popup/popup.component";
import {TransactionModel} from "../../../model/account/transaction-model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  accounts: AccountModel[] = [];
  selectedAccount!: AccountModel;
  @ViewChild(AccountDetailComponent)
  accountDetailsPopup!: AccountDetailComponent;
  error: string = "";
  transactions: TransactionModel[] = [];

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllAccountsForLoggedInUser()

  }

  prikaziDetalje(racun: AccountModel) {
    this.setAccountDetails(racun)
    this.accountDetailsPopup.openPopup(racun)
  }

  private setAccountDetails(racun: any) {
    this.selectedAccount = racun;
  }


  selectAccount(racun: any) {
    this.setAccountDetails(racun)
    const selectedAccId = this.selectedAccount.id.toString()
    this.getAllTransactionsForAccount(selectedAccId);
  }

  private getAllAccountsForLoggedInUser() {
    this.loading = true;

    this.accountService.getAllAccountsForLoggedInUser().subscribe({
      error: (error) => {
        this.loading = false;
        this.popupComponent.openPopup(error.message)
      },
      next: (allAccountsForLoggedInUser: any[]) => {
        this.accounts = allAccountsForLoggedInUser;

        this.selectedAccount = this.accounts[0]
        this.error = "";
        if (this.selectedAccount) {
          const selectedAccId = this.selectedAccount.id.toString();
          this.getAllTransactionsForAccount(selectedAccId);
        }

        this.loading = false;
      }
    });
  }

  private getAllTransactionsForAccount(selectedAccountId: string) {
    this.loading = true;

    this.accountService.getAllTransactionsForAccount(selectedAccountId).subscribe({
      error: (error) => {
        this.loading = false;
        this.popupComponent.openPopup(error.message)
      },
      next: (allTransactionsForAccount: any[]) => {
        this.transactions = []
        console.log("selacc: " + selectedAccountId)
        this.transactions = allTransactionsForAccount;

        this.transactions = this.transactions.sort((a, b) => {
          const dateA = new Date(a.paymentTime.split('-').reverse().join('-'));
          const dateB = new Date(b.paymentTime.split('-').reverse().join('-'));
          return dateB.getTime() - dateA.getTime();
        });
        this.loading = false;
        this.error = "";
      }
    });
  }
}
