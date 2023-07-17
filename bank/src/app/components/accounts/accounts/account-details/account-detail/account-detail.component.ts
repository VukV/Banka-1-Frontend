import {Component, ViewChild} from '@angular/core';
import {AccountService} from "../../../../../services/account/account.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AccountsComponent} from "../../accounts.component";
import {AccountModel} from "../../../../../model/account/accounts-model";
import {PopupComponent} from "../../../../popup/popup/popup.component";
import {UserModel} from "../../../../../model/user/user-model";
import {UserService} from "../../../../../services/user/user.service";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  displayStyle: string = "none";
  selectedAccount!: AccountModel;
  newAccountName: string = "";
  owner!: UserModel;

  loading: boolean = false;

  constructor(private accountService: AccountService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {

  }

  changeName() {
    if (this.newAccountName != "") {
      this.loading = true;
      this.accountService.changeAccountName(this.newAccountName, this.selectedAccount.id, this.selectedAccount.accountType).subscribe({
        next: () => this.router.navigate(["accounts"]),
        error: (error) => this.popupComponent.openPopup(`Čuvanje izmena nije uspelo: ${error.error.message}`)
      });
      this.loading = false;
      console.log("dsa" + this.newAccountName)
    }

  }

  private getOwnerbyId(ownerId: string) {
    this.loading = true;
    this.userService.getUserById(ownerId).subscribe(
      (user) => {
        this.owner = user;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.popupComponent.openPopup(error.message);
      }
    )
  }

  newPayment() {

  }

  openPopup(selectedAccount: AccountModel) {
    this.selectedAccount = selectedAccount;
    if (this.selectedAccount)
      this.getOwnerbyId(this.selectedAccount.ownerId.toString());
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }


}
