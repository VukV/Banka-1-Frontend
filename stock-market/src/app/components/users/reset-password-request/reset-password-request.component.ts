import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../../popup/popup/popup.component";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent implements OnInit {

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;
  email: string

  constructor(private userService: UserService, private router:Router) {
    this.email = ''
  }

  ngOnInit(): void {
  }

  sendPassResetReq(): void {
    this.userService.resetPasswordRequest(this.email).subscribe({
      complete: () => {

      },
      error: (error) => {
        this.popupComponent.openPopup(error.message);
      },
      next: (any) => {
        this.popupComponent.openPopup("Proverite email za detalje o promeni šifre.");
      }

    })
  }

  redirect(): void {
    this.router.navigate(['/login'])
  }

}
