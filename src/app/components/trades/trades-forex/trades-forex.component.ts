import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-trades-forex',
  templateUrl: './trades-forex.component.html',
  styleUrls: ['./trades-forex.component.css']
})
export class TradesForexComponent implements OnInit {

  forexFormGroup!: FormGroup;

  errorMessage!: string;

  allOrNone = false;
  selectedCurrency1 = "";
  selectedCurrency2 = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.forexFormGroup = this.formBuilder.group({
      quantity: ['', Validators.required],
      limit: ['', Validators.required],
      stop: ['', Validators.required],
      selectedCurrency1: ['', Validators.required],
      selectedCurrency2: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      this.selectedCurrency1 = params['fromC'];
      this.selectedCurrency2 = params['toC'];
    });
  }

  onButtonForexSubmit() {
    if(this.forexFormGroup.value.quantity != null && this.forexFormGroup.value.quantity != "" &&
      this.forexFormGroup.value.limit != null && this.forexFormGroup.value.limit != "" &&
      this.forexFormGroup.value.stop != null && this.forexFormGroup.value.stop != "" &&
      this.selectedCurrency1 != null && this.selectedCurrency1 != "" &&
      this.selectedCurrency2 != null && this.selectedCurrency2 != ""
    ){

      this.errorMessage = "";

      //POZIV SERVISA KA APIJU; SLANJE PODATAKA NA SERVICE

      this.router.navigate(['/'])
    } else {
      this.errorMessage = 'Polja nisu popunjena!';
    }

  }
}
