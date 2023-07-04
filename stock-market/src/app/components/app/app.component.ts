import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/user/current-user.service";
import {UserRoleEnum} from "../../model/user/user-role-enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'si-banka-1-front';

  displayLogout: string = "none";
  isLoggedIn: boolean = false;
  userLetter: string = "";

  isAdmin: boolean = false;
  isAgent: boolean = false;
  isSupervisor: boolean = false;

  constructor(private router: Router, private currentUserService: CurrentUserService) {
  }

  ngOnInit(): void {
    this.currentUserService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.checkRoles();
      this.getUserLetter();
    });

    this.checkRoles();
    this.getUserLetter();
  }

  logout(){
    this.currentUserService.logout();
  }

  checkRoles(){
    this.isAdmin = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_ADMIN);
    this.isAgent = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_AGENT);
    this.isSupervisor = this.currentUserService.checkUserRole(UserRoleEnum.ROLE_SUPERVISOR);
  }

  getUserLetter(){
    this.userLetter = this.currentUserService.getFirstUserLetter();
  }

  goToMyProfile(){
    this.router.navigate(['/my-profile']);
  }
}
