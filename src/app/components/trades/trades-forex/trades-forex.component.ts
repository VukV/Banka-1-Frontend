import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trades-forex',
  templateUrl: './trades-forex.component.html',
  styleUrls: ['./trades-forex.component.css']
})
export class TradesForexComponent implements OnInit {

  forexFormGroup!: FormGroup;

  errorMessage!: string;

  currencyList = ['v1', 'v2', 'v3'];

  allornone = false;
  selectedCurrency1 = this.currencyList[0];
  selectedCurrency2 = this.currencyList[0];

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.forexFormGroup = this.formBuilder.group({
      quantity: ['', Validators.required],
      limit: ['', Validators.required],
      stop: ['', Validators.required],
      selectedCurrency1: ['', Validators.required],
      selectedCurrency2: ['', Validators.required],
    })

  }

  onButtonForexSubmit() {

    if (this.forexFormGroup.value.quantity != null && this.forexFormGroup.value.quantity != "" &&
      this.forexFormGroup.value.limit != null && this.forexFormGroup.value.limit != "" &&
      this.forexFormGroup.value.stop != null && this.forexFormGroup.value.stop != "" &&
      this.selectedCurrency1 != null && this.selectedCurrency1 != "" &&
      this.selectedCurrency2 != null && this.selectedCurrency2 != ""
    ) {

      // console.log("qua " + this.forexFormGroup.value.quantity);
      // console.log("lim " + this.forexFormGroup.value.limit);
      // console.log("st " + this.forexFormGroup.value.stop);
      // console.log("aon " + this.allornone);
      //
      // console.log("so1 " + this.selectedCurrency1);
      // console.log("so2 " + this.selectedCurrency2);

      this.errorMessage = "";

      //POZIV SERVISA KA APIJU; SLANJE PODATAKA NA SERVICE

      this.router.navigate(['/'])
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }

  }
}
