import {Component, ViewChild} from '@angular/core';
import {ContactRequest} from "../../../model/contacts/contact-request";
import {ContactsService} from "../../../services/contacts/contacts.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-contact-popup',
  templateUrl: './create-contact-popup.component.html',
  styleUrls: ['./create-contact-popup.component.css']
})
export class CreateContactPopupComponent {

  companyId: string | "" = ""
  fullName: string = ""
  email: string = ""
  phoneNumber: string = ""
  position: string = ""
  note: string = ""
  contactRequest!: ContactRequest
  loading: boolean = false
  displayStyle = "none"
  createContactGroup!: FormGroup

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent

  constructor(private contactsService: ContactsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createContactGroup = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")]],
      position: ['', Validators.required],
      note: ['']
    });
  }

    openPopup(companyId: string | ""){
    this.companyId = companyId
    this.displayStyle = "block"
  }

  closePopup() {
    this.displayStyle = "none"
  }

  createContact(companyId: string, fullName: string,
                phoneNumber: string, email: string, position: string, note: string){

    if(this.createContactGroup.invalid){
      this.popupComponent.openPopup("Sva polja su obavezna.");
    }else{
      this.loading = true
      this.contactsService.createContact(companyId, fullName, phoneNumber, email, position, note).subscribe(
        () => {
          this.loading = false;
          this.closePopup();
          window.location.reload();
        },
        (error) => {
          this.popupComponent.openPopup(error.message);
          this.loading = false;
        }
      )
    }
    }

}
