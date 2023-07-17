import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-account-main',
  templateUrl: './create-account-main.component.html',
  styleUrls: ['./create-account-main.component.css']
})
export class CreateAccountMainComponent {
  selectedAccountType: string = "tekuci";

  constructor(private router: Router, private location: Location) {
  }

  goToAccountPage(): void {
    if (this.selectedAccountType === 'tekuci') {
      this.router.navigate(['/create-current-account']);
    } else if (this.selectedAccountType === 'devizni') {
      this.router.navigate(['/create-foreign-currency-account']);
    } else if (this.selectedAccountType === 'poslovni') {
      this.router.navigate(['/create-bussiness-account']);
    }
  }

  goBack() {
    this.location.back();
  }
}
