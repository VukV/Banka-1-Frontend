import {Component, ViewChild} from '@angular/core';
import {ContactsResponse} from "../../../model/contacts/contacts-response";
import {Router} from "@angular/router";
import {ContactsService} from "../../../services/contacts/contacts.service";
import {UpdateContactRequest} from "../../../model/contacts/contact-request";
import {PopupComponent} from "../../popup/popup/popup.component";
import {LogInRequest} from "../../../model/user/log-in-request";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details-popup.component.html',
  styleUrls: ['./contact-details-popup.component.css']
})
export class ContactDetailsPopupComponent {

  contact!: ContactsResponse
  companyId: string | null = ""
  contactId: string = ""
  fullName: string = ""
  phoneNumber: string = ""
  email: string = ""
  position: string = ""
  note: string = ""
  displayStyle = "none"
  loading: boolean = false
  contactDetailsGroup!: FormGroup

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent

  constructor(private contactsService: ContactsService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactDetailsGroup = this.formBuilder.group({
      companyId: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['',[ Validators.required, Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]],
      position: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  openPopup(){
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  updateContact(){
    this.loading = true
    this.contactsService.updateContact(this.contactId, this.fullName,
      this.phoneNumber, this.email, this.position, this.note ).subscribe(
      (data) => {
        this.loading = false
        this.popupComponent.closePopup()
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  deleteContact(){
    this.loading = true;
    this.contactsService.deleteContact(this.contactId).subscribe(
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

  callDeleteOrUpdate(){
    if(this.contactDetailsGroup.invalid){
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }
  }

  onButtonClick(flag: string){
    if(this.contactDetailsGroup.invalid){
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }else{
      if(flag === 'delete'){
        this.deleteContact()
      }
      if(flag === 'update') {
        this.updateContact()
      }
    }


  }

}
