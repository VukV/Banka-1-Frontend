import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-account-main',
  templateUrl: './create-account-main.component.html',
  styleUrls: ['./create-account-main.component.css']
})
export class CreateAccountMainComponent {
  selectedAccountType: string = "CURRENT";

  constructor(private router: Router, private location: Location) {
  }

  goToAccountPage(): void {
    if (this.selectedAccountType === 'CURRENT') {
      this.router.navigate(['/create-current-account']);
    } else if (this.selectedAccountType === 'FOREIGN_CURRENCY') {
      this.router.navigate(['/create-foreign-currency-account']);
    } else if (this.selectedAccountType === 'BUSINESS') {
      this.router.navigate(['/create-bussiness-account']);
    }
  }

  goBack() {
    this.location.back();
  }
}
