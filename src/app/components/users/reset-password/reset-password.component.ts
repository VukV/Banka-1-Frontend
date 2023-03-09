import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupComponent} from "../../popup/popup.component";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  passwordEntryForm!: FormGroup;
  userId!: string | null;

  errorMessage: string = ''

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.passwordEntryForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });


    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
  }

  onPasswordEntrySubmit() {
    // Proveriti da li se sifre slazu
    if (this.passwordEntryForm.value.password !== this.passwordEntryForm.value.confirmPassword) {
      this.errorMessage = 'Šifre se ne slažu!';
      return;
    }

    //Pozivamo backend api da podesimo sifru uz pomoc verifikacionog koda i userId-a
    if (this.userId != null && this.userId != "" &&
      this.passwordEntryForm.value.code != null && this.passwordEntryForm.value.code != "" &&
      this.passwordEntryForm.value.password != null && this.passwordEntryForm.value.password != "") {

      this.userService.activatePassword(this.userId, this.passwordEntryForm.value.code, this.passwordEntryForm.value.password)
        .subscribe(
          () => {
            //this.popupService.showPopup('Password activated successfully!');
            this.router.navigate(['/']);
          },
          error => {
            this.openPopupExample(error.message);
          }
        );

      // Nakon uspesnog unosa sifre redirektovavnje na home
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }

  }

  openPopupExample(errorText: string) {
    this.popupComponent.openPopup(errorText);
  }
}
