import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AccountService} from "../../../../services/account/account.service";
import {PopupComponent} from "../../../popup/popup/popup.component";
import {NaturalPersonsComponent} from "../../../natural-persons/natural-persons.component";
import {UserModel} from "../../../../model/user/user-model";
import {UserService} from "../../../../services/user/user.service";
import {CurrentUserService} from "../../../../services/user/current-user.service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;

@Component({
  selector: 'app-create-current-account',
  templateUrl: './create-current-account.component.html',
  styleUrls: ['./create-current-account.component.css']
})
export class CreateCurrentAccountComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  selectedAccountType: string = "PERSONAL";
  selectedNaturalPerson!: UserModel;
  private error: string = "";
  nameAccount: string = "";
  private currentUserId!: number;
  private interestRate = 0.5
  private maintenanceCost = 255.0

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private userService: UserService, private currUserService: CurrentUserService, private accountService: AccountService) {
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

  goBack() {
    this.location.back();
  }

  create() {
    console.log("emply: " + this.currentUserId)
    console.log("name: " + this.nameAccount)
    console.log("acctype: " + this.selectedAccountType)
    console.log("owner: " + this.selectedNaturalPerson.firstName)

    if (this.currentUserId != null && this.nameAccount != "" && this.selectedAccountType != null && this.selectedNaturalPerson != null) {

      this.accountService.createCurrentAccount(this.selectedNaturalPerson.id, this.nameAccount, this.currentUserId, this.selectedAccountType,
        this.interestRate, this.maintenanceCost).subscribe({
        next: () => this.router.navigate(["create-new-account"]),
        error: (err) => console.log(err)
      })
    } else {
      this.popupComponent.openPopup(`Niste uneli sva polja!`)
      this.error = "Niste uneli sva polja!"
    }
  }

  goToNaturePersonsPage() {
    let currentUrl = this.router.url;
    currentUrl = currentUrl.split('?')[0]; // Cut off at the first occurrence of '?'
    this.router.navigate(['/natural-persons'], {queryParams: {returnUrl: currentUrl}});
  }


}
