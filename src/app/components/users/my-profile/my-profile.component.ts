import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup.component";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../../../model/user/user-model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  email: string = "";
  phone: string = "";
  jmbg: string = "";
  firstName: string = "";
  lastName: string = "";
  position: string = "";
  error: string = "";


  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.getMyProfile();
  }

  getMyProfile(){
    this.userService.getMyProfile()
      .subscribe({
        complete: () => {

        },
        error: (error) => {
          this.popupComponent.openPopup(error.message)
        },
        next: (user) => {
          this.setUserData(user);
        }
      });
  }

  updateMyProfile(): void {
    this.error = "";
    if(this.phone == "") {
      this.error = "Telefon mora biti unet!";
      return;
    }
    if(this.firstName == "") {
      this.error = "Ime mora biti uneto!";
      return;
    }
    if(this.lastName == "") {
      this.error = "Prezime mora biti uneto!";
      return;
    }

    this.userService.updateMyProfile(this.firstName, this.lastName, this.phone)
      .subscribe({
        complete: () => {

        },
        error: (error) => {
          this.popupComponent.openPopup(error.message)
        },
        next: (updatedUser) => {
          this.setUserData(updatedUser);
          this.popupComponent.openPopup("Izmene su sačuvane!");

          this.error = "";
        }
      });
  }

  cancel(): void {
    this.location.back();
  }

  changePasswordRequest(){
    this.userService.resetPasswordRequest(this.email).subscribe({
      complete: () => {

      },
      error: (error) => {
        this.popupComponent.openPopup(error.message)
      },
      next: (any) => {
        this.popupComponent.openPopup("Proverite email za detalje o promeni šifre.")
      }

    })
  }

  private setUserData(user: UserModel){
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phoneNumber;
    this.email = user.email;
    this.jmbg = user.jmbg;
    this.position = user.position;
  }
}
