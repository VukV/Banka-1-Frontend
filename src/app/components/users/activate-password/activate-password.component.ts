import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupComponent} from "../../popup/popup/popup.component";
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-activate-password',
  templateUrl: './activate-password.component.html',
  styleUrls: ['./activate-password.component.css']
})
export class ActivatePasswordComponent implements OnInit {

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  passwordEntryForm!: FormGroup;
  userId!: string | null;

  passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}$");
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
    if (!this.passwordRegex.test(this.passwordEntryForm.value.password)) {
      this.errorMessage = "Šifra mora da sadrži veliko i malo slovo, broj, specijalni karakter, i da ima 8 karaktera!";
      return;
    }

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
