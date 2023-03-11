import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup.component";
import {UserPositionEnum} from "../../../model/user-position-enum";
import {UserRoleEnum} from "../../../model/user-role-enum";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {MyProfileService} from "../../../services/my-profile.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;
  element = false;
  emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  jmbgRegex = new RegExp("^[0-9]{13}$");

  email: string = "";
  phone: string = "";
  jmbg: string = "";
  firstName: string = "";
  lastName: string = "";
  position: string = "";
  allPositions: string[] = Object.values(UserPositionEnum);
  roles: string[] = [];
  allRoles: string[] = Object.values(UserRoleEnum);
  error: string = "";



  constructor(private UserService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }



  updateMyprofile(): void {
    this.error = "";
    if (!this.emailRegex.test(this.email)) {
      this.error = "Email nije validan!";
      return;
    }
    if (this.phone == "") {
      this.error = "Telefon mora biti unet!";
      return;
    }
    if (!this.jmbgRegex.test(this.jmbg)) {
      this.error = "JMBG nije validan!";
      return;
    }
    if (this.firstName == "") {
      this.error = "Ime mora biti uneto!";
      return;
    }
    if (this.lastName == "") {
      this.error = "Prezime mora biti uneto!";
      return;
    }
    if (this.position == "") {
      this.error = "Pozicija mora biti odabrana!";
      return;
    }
    const position = Object.keys(UserPositionEnum)[Object.values(UserPositionEnum).indexOf(this.position as UserPositionEnum)];
    const roles = this.roles.map(role => Object.keys(UserRoleEnum)[Object.values(UserRoleEnum).indexOf(role as UserRoleEnum)]);
    this.UserService.updateMyprofile(this.firstName, this.lastName, this.phone)
      .subscribe({
          next: () => this.router.navigate(["users"]),
          error: (error) => this.popupComponent.openPopup(`Izmene su neuspešne: ${error.error.message}`)
        }
      );
  }

  cancel(): void {
    this.router.navigate(["users"]);
  }



}
