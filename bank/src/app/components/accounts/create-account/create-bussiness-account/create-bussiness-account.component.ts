import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {PopupComponent} from "../../../popup/popup/popup.component";
import {UserModel} from "../../../../model/user/user-model";
import {UserService} from "../../../../services/user/user.service";
import {CompanyModel} from "../../../../model/account/company-model";
import {CurrentUserService} from "../../../../services/user/current-user.service";
import {CompanyService} from "../../../../services/company/company.service";
import {Observable} from "rxjs";
import {AccountService} from "../../../../services/account/account.service";

@Component({
  selector: 'app-create-bussiness-account',
  templateUrl: './create-bussiness-account.component.html',
  styleUrls: ['./create-bussiness-account.component.css']
})
export class CreateBussinessAccountComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;
  selectedCurrency: string = "RSD";
  allCurrencies: string[] = ["RSD", "EUR", "CHF", "USD", "GBD", "JPY", "CAD", "AUD"];
  selectedNaturalPerson!: UserModel;
  nameAccount: string = "";
  private currentUserId!: number;
  selectedCompanyId!: number;
  allCompanies!: CompanyModel[];

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private currUserService: CurrentUserService, private userService: UserService, private accountService: AccountService, private companyService: CompanyService) {
  }

  ngOnInit() {
    this.currentUserId = this.currUserService.getUserId()

    this.route.queryParams.subscribe(params => {
      const objectId = params['objectId'];

      if (objectId != undefined)
        this.getObjectById(objectId);

    });
  }

  private getObjectById(objectId: string): any {
    this.getAllCompanies()

    this.userService.getUser(parseInt(objectId)).subscribe({
      next: (user: UserModel) => {
        this.selectedNaturalPerson = user;
      },
      error: (error) => this.popupComponent.openPopup(`Nije uspelo dohvatanje korisnika: ${error.error.message}`)
    })
    console.log("Obj By id: " + this.selectedNaturalPerson)
  }

  create(): void {

    console.log("owner: " + this.selectedNaturalPerson.firstName)
    console.log("name: " + this.nameAccount)
    console.log("emply: " + this.currentUserId)
    console.log("cmpny: " + this.selectedCompanyId)

    if (this.currentUserId != null && this.nameAccount != "" && this.selectedCompanyId != null && this.selectedNaturalPerson != null) {

      this.accountService.createBussinessAccount(this.selectedNaturalPerson.id, this.nameAccount, this.currentUserId, this.selectedCompanyId,).subscribe({
        next: () => this.router.navigate(["create-new-account"]),
        error: (err) => console.log(err)
      })
    } else {
      this.popupComponent.openPopup(`Niste uneli sva polja!`)
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

  getAllCompanies() {
    this.companyService.listCompanies().subscribe({
      next: (allCompanies) => {
        this.allCompanies = allCompanies;
      },
      error: (error) => {
        this.popupComponent.openPopup(error.message);
      }
    })
  }

}
