import {Component, OnInit, ViewChild} from '@angular/core';
import {UserPositionEnum} from "../../../model/user/user-position-enum";
import {UserRoleEnum} from "../../../model/user/user-role-enum";
import {UserService} from "../../../services/user/user.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  phoneRegex = new RegExp('^((\\+381)|0)6[0-9]{4,8}$');


  firstName: string = "";
  lastName: string = "";
  birthDate: string = "";
  gender: string = "";
  email: string = "";
  phoneNumber: string = "";
  roles: string[] = Object.values(UserRoleEnum);
  homeAddress: string = "";
  error: string = "";


  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void { }

  roleCheckChanged(role: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked)
      this.roles.push(role);
    else
      this.roles = this.roles.filter(arrayRole => arrayRole !== role);
  }

  addUser(): void {
    this.error = "";
    if (!this.emailRegex.test(this.email)) {
      this.error = "Email nije validan!";
      return;
    }
    if (!this.phoneRegex.test(this.phoneNumber)) {
      this.error = "Telefon nije validan!";
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
    if (this.birthDate == "") {
      this.error = "Datum rodjenja mora biti uneto!";
      return;
    }
    if (this.homeAddress == "") {
      this.error = "Adresa mora biti uneta!";
      return;
    }
    if (this.gender == "") {
      this.error = "Pol mora biti unet!";
      return;
    }
    if (this.email == "") {
      this.error = "Email mora biti unet!";
      return;
    }
    if (this.phoneNumber == "") {
      this.error = "Broj telefona mora biti unet!";
      return;
    }
    this.userService.addUser(this.firstName, this.lastName, this.birthDate, this.homeAddress, this.gender, this.email, this.phoneNumber)
      .subscribe({
          next: () => this.router.navigate(["users"]),
          error: (error) => this.popupComponent.openPopup(`Registrovanje korisnika nije uspelo: ${error.error.message}`)
        }
      );
  }

  cancel(): void {
    this.router.navigate(["users"]);
  }
}
