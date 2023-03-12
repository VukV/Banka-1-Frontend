import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrentUserService} from "../../../services/current-user.service";
import {PopupComponent} from "../../popup/popup.component";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {LogInRequest} from "../../../model/log-in-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;
  email: string
  password: string
  jwt: string
  router: Router
  showPassword: boolean
  loginReq: LogInRequest | undefined

  constructor(private currentUserService: CurrentUserService, private userservice: UserService, router: Router) {
    this.email = ''
    this.password = ''
    this.jwt = ''
    this.router = router
    this.showPassword = false
  }

  ngOnInit(): void {
  }


  startRequest(loginReq: LogInRequest){
    this.userservice.logUserIn(loginReq).subscribe({
      complete: () => {

      },
      error: (error) => {
        this.popupComponent.openPopup("Pogrešni kredencijali!");
      },
      next: (loginRes) => {
        this.jwt = loginRes.jwtToken;
        this.currentUserService.setLogin(this.jwt);
        this.router.navigate(['']);
      }
    })
  }

  handleLoggingIn(): void{

    if(!this.email){
      this.popupComponent.openPopup("Unesite mejl adresu.")
      return;
    }

    if(!this.password){
      this.popupComponent.openPopup("Unesite lozinku.")
      return;
    }

    if(!this.email && !this.password){
      this.popupComponent.openPopup("Sva polja su obavezna.")
      return;
    }

    if(this.email && this.password){
      const logInRequest: LogInRequest = {
        email: this.email,
        password: this.password
      };
      this.startRequest(logInRequest);
    }

  }

  toggleShowPassword(event: Event): void {
    this.showPassword = !this.showPassword
  }
}
