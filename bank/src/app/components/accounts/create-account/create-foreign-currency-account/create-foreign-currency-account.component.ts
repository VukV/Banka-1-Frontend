import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {CurrencyModel} from "../../../../model/account/currency-model";
import {CurrencyService} from "../../../../services/currency/currency.service";
import {UserModel} from "../../../../model/user/user-model";
import {UserService} from "../../../../services/user/user.service";
import {PopupComponent} from "../../../popup/popup/popup.component";
import {CurrentUserService} from "../../../../services/user/current-user.service";
import {AccountService} from "../../../../services/account/account.service";

@Component({
  selector: 'app-create-foreign-currency-account',
  templateUrl: './create-foreign-currency-account.component.html',
  styleUrls: ['./create-foreign-currency-account.component.css']
})
export class CreateForeignCurrencyAccountComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  selectedCurrency1: string = "RSD";
  selectedCurrency2: string = "";
  selectedCurrency3: string = "";
  allCurrencies: string[] = ["RSD", "EUR", "CHF", "USD", "GBD", "JPY", "CAD", "AUD"];
  selectedNaturalPerson!: UserModel;
  nameAccount: string = "";
  private currentUserId!: number;
  private error: string="";
  private selectedAccountType: string="FOREIGN_CURRENCY";

  constructor(private route: ActivatedRoute, private router: Router, private location: Location,private currUserService:CurrentUserService, private accountService: AccountService,private userService: UserService) {
  }

  ngOnInit() {
    this.currentUserId = this.currUserService.getUserId()

    this.route.queryParams.subscribe(params => {
      const objectId = params['objectId'];

      if (objectId != undefined)
        this.selectedNaturalPerson = this.getObjectById(objectId);
    });
  }

  private getObjectById(objectId: string): any {
    this.userService.getUser(parseInt(objectId)).subscribe({
      next: (user: UserModel) => {
        this.selectedNaturalPerson = user;
      },
      error: (error) => this.popupComponent.openPopup(`Nije uspelo dohvatanje korisnika: ${error.error.message}`)
    })
    console.log("Obj By id: " + this.selectedNaturalPerson)
  }

  create(): void {
    console.log("selectedCurrency1: " + this.selectedCurrency1)
    console.log("selectedCurrency2: " + this.selectedCurrency2)
    console.log("selectedCurrency3: " + this.selectedCurrency3)

    console.log("owner: " + this.selectedNaturalPerson.firstName)
    console.log("emply: " + this.currentUserId)
    console.log("name: " + this.nameAccount)
    console.log("owner: " + this.selectedNaturalPerson.firstName)

    if (this.currentUserId != null && this.nameAccount != "" && this.selectedAccountType != null && this.selectedNaturalPerson != null) {

      this.accountService.createForeignAccount(this.selectedNaturalPerson.id, this.nameAccount, this.currentUserId, this.selectedCurrency1,
        this.selectedCurrency2, this.selectedCurrency3, this.selectedAccountType).subscribe({
        next: () => this.router.navigate(["accounts"]),
        error: (err) => console.log(err)
      })
    } else {
      this.popupComponent.openPopup(`Niste uneli sva polja!`)
      this.error = "Niste uneli sva polja!"
    }
  }

  goBack() {
    this.location.back();
  }


  goToNaturePersonsPage() {
    let currentUrl = this.router.url;
    currentUrl = currentUrl.split('?')[0]; // Cut off at the first occurrence of '?'
    this.router.navigate(['/natural-persons'], {queryParams: {returnUrl: currentUrl}});
  }
}
