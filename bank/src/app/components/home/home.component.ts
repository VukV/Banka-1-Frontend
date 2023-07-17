import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../popup/popup/popup.component";
import {AnimationOptions} from "ngx-lottie";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/user/current-user.service";
import {UserRoleEnum} from "../../model/user/user-role-enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isEmployee : boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  showHelp: boolean = false;

  options: AnimationOptions = {
    path: '/assets/lottie/stock-animation.json',

  }

  constructor(private router: Router, private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.isEmployee = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_EMPLOYEE);
  }

  continueFromHomePage(){
    if(this.isEmployee){
      this.router.navigate(['natural-persons']);
    }
    else {
      this.router.navigate(['home-page']);
    }

  }
}
