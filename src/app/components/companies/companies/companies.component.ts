import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from "../../../model/companies/Company";
import {CompaniesService} from "../../../services/companies/companies.service";
import {Router} from "@angular/router";
import {PopupComponent} from "../../popup/popup/popup.component";
import {CreateCompanyPopupComponent} from "../create-company-popup/create-company-popup.component";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = []
  _id: string = ""
  name: string = ""
  registrationNumber: string = ""
  taxNumber: string = ""
  activityCode: string = ""
  address: string = ""

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  @ViewChild(CreateCompanyPopupComponent)
  createCompanyPopupComponent!: CreateCompanyPopupComponent;

  loading: boolean = false;

  constructor(private companiesService: CompaniesService, private router: Router) {
  }

  ngOnInit(): void {
    this.listCompanies()
  }

  listCompanies() {
    this.loading = true;

    this.companiesService.getCompanies(this.name, this.registrationNumber, this.taxNumber).subscribe(
      (data) => {
        this.companies = data;
        this.loading = false;
      },
      (error) => {
        this.popupComponent.openPopup(error.message);
        this.loading = false;
      }
    )

  }

  companyDetails(kompanija: Company) {
    this.router.navigate(['company-details/' + kompanija._id])
  }

  createCompany() {
    this.createCompanyPopupComponent.openPopup("Kreiranje Kompanije")
  }
}
