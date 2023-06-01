import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopupComponent} from "../../popup/popup/popup.component";
import {CreateContactPopupComponent} from "../create-contact-popup/create-contact-popup.component";
import {ContactsResponse} from "../../../model/contacts/contacts-response";
import {ContactsService} from "../../../services/contacts/contacts.service";
import {ContactDetailsPopupComponent} from "../contact-details-popup/contact-details-popup.component";
import {AccountDetailsPopupComponent} from "../account-details-popup/account-details-popup.component";
import {Account} from "../../../model/account/account";
import {AccountService} from "../../../services/account/account.service";
import {CreateAccountPopupComponent} from "../create-account-popup/create-account-popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../../../model/companies/company";
import {CompaniesService} from "../../../services/companies/companies.service";
import {Contract} from "../../../model/contracts/contract";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  companyId: string | "" = ""
  contactId: string = ""
  company: Company | undefined;
  accounts: any[] = [];
  contracts: Contract[] = [];
  kontakti: ContactsResponse[] = [];
  racuni: Account[] = [];

  compDetailsFormGroup!: FormGroup;

  errorMessage: string = '';

  loading: boolean = false;

  @ViewChild(CreateContactPopupComponent)
  createContactPopup!: CreateContactPopupComponent;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(ContactDetailsPopupComponent)
  contactDetailsPopup!: ContactDetailsPopupComponent;

  @ViewChild(AccountDetailsPopupComponent)
  accountDetailsPopup!: AccountDetailsPopupComponent

  @ViewChild(CreateAccountPopupComponent)
  createAccountPopup!: CreateAccountPopupComponent

  constructor(private formBuilder: FormBuilder, private router: Router,
              private contactsService: ContactsService, private accountService: AccountService,
              private companiesService: CompaniesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.compDetailsFormGroup = this.formBuilder.group({

      naziv: ["", Validators.required],
      sifDelatnosti: ["", Validators.required],
      maticniBr: ["", Validators.required],
      pib: ["", Validators.required],
      adresa: ["", Validators.required],
    });

    this.getCompanyFromRoute()
    this.getCompany()
    this.getContacts()
    this.getAccounts()

  }

  getCompanyFromRoute() {
    this.companyId = this.route.snapshot.paramMap.get('id')!;
  }

  getCompany() {
    this.loading = true;
    this.companiesService.getCompanyById(this.companyId).subscribe(
      (data) => {
        this.loading = false;
        this.company = data

        this.compDetailsFormGroup = this.formBuilder.group({

          naziv: [this.company!.name, Validators.required],
          sifDelatnosti: [this.company!.activityCode, Validators.required],
          maticniBr: [this.company!.registrationNumber, Validators.required],
          pib: [this.company!.taxNumber, Validators.required],
          adresa: [this.company!.address, Validators.required],
        });

      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )

  }

  onButtonAzuriraj() {
    this.loading = true;
    if (this.compDetailsFormGroup.value.naziv != null && this.compDetailsFormGroup.value.naziv != "" &&
      this.compDetailsFormGroup.value.sifDelatnosti != null && this.compDetailsFormGroup.value.sifDelatnosti != "" &&
      this.compDetailsFormGroup.value.maticniBr != null && this.compDetailsFormGroup.value.maticniBr != "" &&
      this.compDetailsFormGroup.value.pib != null && this.compDetailsFormGroup.value.pib != "" &&
      this.compDetailsFormGroup.value.adresa != null && this.compDetailsFormGroup.value.adresa != ""
      //&&
      //this.compDetailsFormGroup.value.drzava != null && this.compDetailsFormGroup.value.drzava != ""
    ) {
      this.errorMessage = "";

      this.companiesService.updateCompany(this.company!._id, this.compDetailsFormGroup.value.naziv, this.compDetailsFormGroup.value.sifDelatnosti, this.compDetailsFormGroup.value.adresa).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(["companies"]);
        },
        (error) => {
          this.popupComponent.openPopup(error.message);
          this.loading = false;
        }
      )
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }

  }

  deleteCompany() {
    this.loading = true;

    if (this.contracts.length === 0 && this.accounts.length === 0) {
      this.companiesService.deleteCompany(this.company!._id).subscribe(() => {
          this.loading = false;
          this.router.navigate(["companies"]);
        },
        (error) => {
          this.loading = false;
          this.popupComponent.openPopup(error.message);
        })
    }
  }

  getContacts(){
    this.loading = true;
    this.contactsService.getContactsByCompany(this.companyId).subscribe(
      (data) => {
        this.kontakti = data;
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  listContactsById(){
    this.loading = true
    //ToDO check contactId binding
    this.contactsService.getContactDetails(this.contactId).subscribe(
      (data) => {
        this.kontakti = data;
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )

  }

  getAccounts(){
    this.loading = true;
    this.accountService.getAccountsByCompany(this.companyId).subscribe(
      (data) => {
        this.racuni = data;
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

  openContactDetails(contact: ContactsResponse){
    this.setContactDetails(contact)
    this.contactDetailsPopup.openPopup()
  }

  openAccountDetails(account: Account){
    this.setAccountDetails(account)
    this.accountDetailsPopup.openPopup()
  }

  openCreateContactPopup(){
    this.createContactPopup.openPopup(this.companyId)
  }

  openCreateAccountPopup(){
    this.createAccountPopup.openPopup(this.companyId)
  }

  private setContactDetails(contact: ContactsResponse){
    this.contactDetailsPopup.contactId = contact._id
    this.contactDetailsPopup.companyId = this.companyId
    this.contactDetailsPopup.fullName = contact.fullName
    this.contactDetailsPopup.phoneNumber = contact.phoneNumber
    this.contactDetailsPopup.email = contact.email
    this.contactDetailsPopup.position = contact.position
    this.contactDetailsPopup.note = contact.note
  }

  private setAccountDetails(account: Account){
    this.accountDetailsPopup.companyId = this.companyId
    this.accountDetailsPopup._id = account._id
    this.accountDetailsPopup.accountNumber = account.accountNumber
    this.accountDetailsPopup.bankName = account.bankName
    this.accountDetailsPopup.type = account.type
  }

  requiredFieldError(){
    this.popupComponent.openPopup("Unesite id kontakta.")
  }

  deleteAccount(accountId: string){
    this.loading = true;
    this.accountService.deleteAccount(accountId).subscribe(
      () => {
        this.loading = false;
        //this.getAccounts();
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )
  }

}
