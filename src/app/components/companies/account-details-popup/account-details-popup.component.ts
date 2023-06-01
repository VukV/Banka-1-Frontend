import {Component, ViewChild} from '@angular/core';
import {UpdateContactRequest} from "../../../model/contacts/contact-request";
import {PopupComponent} from "../../popup/popup/popup.component";
import {ContactsService} from "../../../services/contacts/contacts.service";
import {Router} from "@angular/router";
import {Account, AccountType} from "../../../model/account/account";
import {AccountService} from "../../../services/account/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-details-popup',
  templateUrl: './account-details-popup.component.html',
  styleUrls: ['./account-details-popup.component.css']
})
export class AccountDetailsPopupComponent {

  displayStyle = "none"
  loading: boolean = false
  companyId: string | null = ''
  _id: string = ''
  accountNumber: string = ''
  bankName: string = ''
  type!: AccountType
  account!: Account
  accountDetailsGroup!: FormGroup

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent

  constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.accountDetailsGroup = this.formBuilder.group({
      companyId: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  openPopup(){
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  deleteAccount(accountId: string){
    if(this.accountDetailsGroup.invalid){
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }else{
      this.loading = true;
      this.accountService.deleteAccount(accountId).subscribe(
        (data) => {
          this.loading = false;
          this.popupComponent.closePopup()
        },
        (error) => {
          this.popupComponent.openPopup(error.message);
          this.loading = false;
        }
      )
    }

  }



}
