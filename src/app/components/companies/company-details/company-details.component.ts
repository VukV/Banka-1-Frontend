import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  drzave: string[] = [];

  racuni: any;
  ugovori: any;
  kontakti: any;

  compDetailsFormGroup!: FormGroup;

  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.compDetailsFormGroup = this.formBuilder.group({
      naziv: ['', Validators.required],
      sifDelatnosti: ['', Validators.required],
      maticniBr: ['', Validators.required],
      pib: ['', Validators.required],
      adresa: ['', Validators.required],
      drzava: ['', Validators.required],
    })
  }

  onButtonAktiviraj() {
    if (this.compDetailsFormGroup.value.naziv != null && this.compDetailsFormGroup.value.naziv != "" &&
      this.compDetailsFormGroup.value.sifDelatnosti != null && this.compDetailsFormGroup.value.sifDelatnosti != "" &&
      this.compDetailsFormGroup.value.maticniBr != null && this.compDetailsFormGroup.value.maticniBr != "" &&
      this.compDetailsFormGroup.value.pib != null && this.compDetailsFormGroup.value.pib != "" &&
      this.compDetailsFormGroup.value.adresa != null && this.compDetailsFormGroup.value.adresa != ""
      //&&
      //this.compDetailsFormGroup.value.drzava != null && this.compDetailsFormGroup.value.drzava != ""
    ) {
      this.errorMessage = "";

      //POZIV SERVISA KA APIJU; SLANJE PODATAKA NA SERVICE

      this.router.navigate(['/'])
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }

  }
}
