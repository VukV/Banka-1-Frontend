import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/current-user.service";
import {UserRoleEnum} from "../../model/user-role-enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'si-banka-1-front';

  displayLogout: string = "none";
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userLetter: string = "";

  constructor(private router: Router, private currentUserService: CurrentUserService) {
  }

  ngOnInit(): void {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.checkRoles();
    this.getUserLetter();
  }

  logout(){
    this.currentUserService.logout();
  }

  checkRoles(){
    this.isAdmin = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_ADMIN);
  }

  getUserLetter(){
    this.userLetter = this.currentUserService.getFirstUserLetter();
  }

  goToMyProfile(){
    this.router.navigate(['/my-profile']);
  }
}
