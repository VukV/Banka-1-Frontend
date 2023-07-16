import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

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
    this.step++;
  }

  onCreateAccountForm(){

  }

  cancel(): void {
    this.router.navigate([""]);
  }
}
