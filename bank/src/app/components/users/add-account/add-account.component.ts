import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit{

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  step = 0;

  emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
  phoneRegex = new RegExp('^((\\+381)|0)6[0-9]{4,8}$');


  accountNumber: string = "";
  phoneNumber: string = "";
  email: string = "";
  activityCode: string = ''
  passwordFieldOne: string = ''
  passwordFieldTwo: string = ''

  createAccountForm!: FormGroup;
  errorMessage: string = ''

  ngOnInit(): void {
    this.step++;
  }

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  nextStep(){
    if(this.step == 1){
      this.errorMessage= "";

      if (!this.emailRegex.test(this.email)) {
        this.errorMessage = "Email nije validan!";
        return;
      }
      if (!this.phoneRegex.test(this.phoneNumber)) {
        this.errorMessage = "Telefon nije validan!";
        return;
      }
      if (this.accountNumber == "") {
        this.errorMessage = "Broj racuna mora biti unet!";
        return;
      }
      if (this.email == "") {
        this.errorMessage = "Email mora biti unet!";
        return;
      }
      if (this.phoneNumber == "") {
        this.errorMessage = "Broj telefona mora biti unet!";
        return;
      }
    } else if (this.step == 2){
      if (this.activityCode == "") {
        this.errorMessage = "Aktivacioni kod mora biti unet!";
        return;
      }
    }
    this.step++;
  }

  onCreateAccountForm(){
      this.errorMessage= "";

      if (this.passwordFieldOne == "") {
        this.errorMessage = "Sifra mora biti uneta!";
        return;
      }
      if (this.passwordFieldTwo == "") {
        this.errorMessage = "Sifra mora biti uneta!";
        return;
      }

      //pozivanje metode servisa
      // this.userService.addUser(this.firstName, this.lastName, formattedDate, this.homeAddress, this.gender, this.email, this.phoneNumber, this.roles)
      //   .subscribe({
      //       next: () => this.router.navigate([""]),
      //       error: (error) => this.popupComponent.openPopup(`Registrovanje korisnika nije uspelo: ${error.error.message}`)
      //     }
      //   );
  }

  cancel(): void {
    if(this.step > 1){
      this.step--;
      this.router.navigate(["add-account"]);
    }else{
      this.router.navigate([""]);
    }
  }
}
