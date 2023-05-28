import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Company} from "../../../model/companies/Company";
import {CompaniesService} from "../../../services/companies/companies.service";
import {PopupComponent} from "../../popup/popup/popup.component";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  companyId: string = ""
  company: Company | undefined;

  accounts: any[] = [];
  contracts: any[] = [];
  kontakti: any[] = [];

  compDetailsFormGroup!: FormGroup;

  errorMessage: string = '';

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  loading: boolean = false;

  constructor(private companiesService: CompaniesService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.compDetailsFormGroup = this.formBuilder.group({

      naziv: ["", Validators.required],
      sifDelatnosti: ["", Validators.required],
      maticniBr: ["", Validators.required],
      pib: ["", Validators.required],
      adresa: ["", Validators.required],
    });

    this.getCompanyFromRoute();
    this.getCompany();

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


}
