import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AccountService} from "../../../../services/account/account.service";
import {PopupComponent} from "../../../popup/popup/popup.component";
import {NaturalPersonsComponent} from "../../../natural-persons/natural-persons.component";
import {UserModel} from "../../../../model/user/user-model";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-create-current-account',
  templateUrl: './create-current-account.component.html',
  styleUrls: ['./create-current-account.component.css']
})
export class CreateCurrentAccountComponent {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  selectedAccountType: string = "licni";
  selectedNaturalPerson!: UserModel;
  private error: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private userService: UserService, private accountService: AccountService) {
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

  goBack() {
    this.location.back();
  }

  next() {
    console.log("acctype: " + this.selectedAccountType)
    console.log("owner: " + this.selectedNaturalPerson.firstName)
    this.router.navigate(["/"]);
  }

  goToNaturePersonsPage() {
    let currentUrl = this.router.url;
    currentUrl = currentUrl.split('?')[0]; // Cut off at the first occurrence of '?'
    this.router.navigate(['/natural-persons'], {queryParams: {returnUrl: currentUrl}});
  }


}
