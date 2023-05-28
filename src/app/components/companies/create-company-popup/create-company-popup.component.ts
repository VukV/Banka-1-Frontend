import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersService} from "../../../services/orders/orders.service";
import {CompaniesService} from "../../../services/companies/companies.service";
import {PopupComponent} from "../../popup/popup/popup.component";
import {ConfirmationPopupComponent} from "../../popup/confirmation-popup/confirmation-popup.component";
import {Company} from "../../../model/companies/Company";

@Component({
  selector: 'app-create-company-popup',
  templateUrl: './create-company-popup.component.html',
  styleUrls: ['./create-company-popup.component.css']
})
export class CreateCompanyPopupComponent implements OnInit {

  message: string = "";
  displayStyle = "none";
  createCompanyGroup!: FormGroup;
  errorMessage: string = "";

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(ConfirmationPopupComponent)
  confirmationPopupComponent!: ConfirmationPopupComponent;


  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private companyService: CompaniesService) {

  }

  ngOnInit(): void {
    this.createCompanyGroup = this.formBuilder.group({
      naziv: ['', Validators.required],
      maticni_broj: ['', Validators.required],
      pib: ['', Validators.required],
      sifra: ['', Validators.required],
      adresa: ['', Validators.required]
    });
  }

  openPopup(message: string) {
    this.message = message;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  onButtonCreateCompany() {

    if (this.createCompanyGroup.value.naziv != null && this.createCompanyGroup.value.naziv != "" &&
      this.createCompanyGroup.value.maticni_broj != null && this.createCompanyGroup.value.maticni_broj != "" &&
      this.createCompanyGroup.value.sifra != null && this.createCompanyGroup.value.sifra != "" &&
      this.createCompanyGroup.value.adresa != null && this.createCompanyGroup.value.adresa != "" &&
      this.createCompanyGroup.value.pib != null && this.createCompanyGroup.value.pib != "") {
      if (this.createCompanyGroup.value.naziv < 1) {
        this.errorMessage = "Neispravan unos naziva!"
        return;
      }

      if (this.createCompanyGroup.value.maticni_broj != null && this.createCompanyGroup.value.maticni_broj != "") {
        if (this.createCompanyGroup.value.maticni_broj < 1) {
          this.errorMessage = "Neispravan unos maticnog broja!"
          return;
        }
      }
      if (this.createCompanyGroup.value.sifra != null && this.createCompanyGroup.value.sifra != "") {
        if (this.createCompanyGroup.value.sifra < 1) {
          this.errorMessage = "Neispravan unos sifre!"
          return;

        }
      }
      if (this.createCompanyGroup.value.adresa != null && this.createCompanyGroup.value.adresa != "") {
        if (this.createCompanyGroup.value.adresa < 1) {
          this.errorMessage = "Neispravan unos adrese!"
          return;

        }
      }

      if (this.createCompanyGroup.value.pib != null && this.createCompanyGroup.value.pib != "") {
        if (this.createCompanyGroup.value.pib < 1) {
          this.errorMessage = "Neispravan unos piba!"
          return;

        }
      }

      this.errorMessage = "";
      this.confirmationPopupComponent.openPopup();

    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }

  }

  onConfirmEvent(eventData: { confirmed: boolean }) {
    if (eventData.confirmed) {
      this.createCompany();
    }
  }

  createCompany() {
    this.companyService.postCompany(this.createCompanyGroup.value.naziv,
      this.createCompanyGroup.value.maticni_broj,
      this.createCompanyGroup.value.pib,
      this.createCompanyGroup.value.sifra,
      this.createCompanyGroup.value.adresa).subscribe(
      () => {
        this.closePopup()
        window.location.reload()

      },
      (error) => {
        this.popupComponent.openPopup(error.message);

      }
    )
  }
}
