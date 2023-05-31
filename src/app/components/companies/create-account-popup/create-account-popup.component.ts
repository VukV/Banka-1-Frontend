import {Component, ViewChild} from '@angular/core';
import {ContactRequest} from "../../../model/contacts/contact-request";
import {PopupComponent} from "../../popup/popup/popup.component";
import {ContactsService} from "../../../services/contacts/contacts.service";
import {AccountService} from "../../../services/account/account.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-account-popup',
  templateUrl: './create-account-popup.component.html',
  styleUrls: ['./create-account-popup.component.css']
})
export class CreateAccountPopupComponent {

  companyId: string | "" = ""
  accountNumber: string = ""
  bankName: string = ""
  type: string = ""
  displayStyle = "none"
  loading: boolean = false
  createAccountGroup!: FormGroup

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent

  constructor(private accountService: AccountService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.createAccountGroup = this.formBuilder.group({
      companyId: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  openPopup(companyId: string | ""){
    this.companyId = companyId
    this.displayStyle = "block"
  }

  closePopup() {
    this.displayStyle = "none"
  }

  createAccount(companyId: string, accountNumber: string,
                bankName: string, type: string){

    if(this.createAccountGroup.invalid){
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }else{
      this.loading = true
      this.accountService.createAccount(companyId, accountNumber, bankName, type).subscribe(
        (data) => {
          this.loading = false
          this.closePopup()
        },
        (error) => {
          this.popupComponent.openPopup(error.message);
          this.loading = false
        }
      )
    }

  }


}
