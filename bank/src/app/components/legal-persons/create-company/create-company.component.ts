import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {CompanyService} from "../../../services/company/company.service";

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {
  id: number = -1;
  companyName: string = "";
  phoneNumber: string = "";
  faxNumber: string = "";
  vatIdNumber!: number;
  identificationNumber!: number;
  activityCode!: number;
  registryNumber!: number;
  error: string = "";

  constructor(private router: Router, private location: Location, private companyService: CompanyService) {
  }

  goBack() {
    this.location.back();
  }

  createCompany() {
    if (this.companyName != null && this.phoneNumber != null && this.faxNumber != null && this.vatIdNumber != null
      && this.identificationNumber != null && this.activityCode != null) {

      this.companyService.createCompany(this.companyName, this.phoneNumber, this.faxNumber, this.vatIdNumber,
        this.identificationNumber, this.activityCode, this.registryNumber).subscribe({
        next: () => this.router.navigate(["legal-persons"]),
        error: (err) => console.log(err)
      })
    } else {
      this.error = "Niste uneli sva polja!"
    }

  }
}
