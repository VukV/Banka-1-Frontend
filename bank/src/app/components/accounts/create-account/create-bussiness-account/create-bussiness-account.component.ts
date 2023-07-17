import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {PopupComponent} from "../../../popup/popup/popup.component";
import {UserModel} from "../../../../model/user/user-model";
import {UserService} from "../../../../services/user/user.service";

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

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private userService: UserService) {
  }

  ngOnInit() {
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

  next(): void {
    console.log("selectedCurrency: " + this.selectedCurrency)

    console.log("owner: " + this.selectedNaturalPerson.firstName)
    this.router.navigate(["/"]);
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
