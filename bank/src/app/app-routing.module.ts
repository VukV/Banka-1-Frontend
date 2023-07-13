import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginGuard} from "./guards/login.guard";
import {ListUsersComponent} from "./components/users/list-users/list-users.component";
import {AddUserComponent} from "./components/users/add-user/add-user.component";
import {UpdateUserComponent} from "./components/users/update-user/update-user.component";
import {MyProfileComponent} from "./components/users/my-profile/my-profile.component";
import {LoginComponent} from "./components/users/login/login.component";
import {
  ResetPasswordRequestComponent
} from "./components/users/reset-password-request/reset-password-request.component";
import {ResetPasswordComponent} from "./components/users/reset-password/reset-password.component";
import {ActivatePasswordComponent} from "./components/users/activate-password/activate-password.component";
import {UserRoleEnum} from "./model/user/user-role-enum";
import {PaymentRecieversComponent} from "./components/payments/payment-recievers/payment-recievers.component";
import {TransferComponent} from "./components/payments/transfer/transfer.component";
import {PaymentRecapComponent} from "./components/payments/payment-recap/payment-recap.component";
import {NewPaymentComponent} from "./components/payments/new-payment/new-payment.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "users",
    component: ListUsersComponent,
    canActivate: [LoginGuard],
    data: {roles: [UserRoleEnum.ROLE_ADMIN]}
  },
  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [LoginGuard],
    data: {roles: [UserRoleEnum.ROLE_ADMIN]}
  },
  {
    path: "update-user/:userId",
    component: UpdateUserComponent,
    canActivate: [LoginGuard],
    data: {roles: [UserRoleEnum.ROLE_ADMIN]}
  },
  {
    path: "my-profile",
    component: MyProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "reset-password-request",
    component: ResetPasswordRequestComponent,
  },
  {
    path: "activate-password/:userId",
    component: ActivatePasswordComponent,
  },
  {
    path: "reset-password/:userId",
    component: ResetPasswordComponent,
  },
  {
    path: "payment-recievers",
    component: PaymentRecieversComponent
  },
  {
    path: "transfer",
    component: TransferComponent
  },
  { path: "payment-recap",
    component: PaymentRecapComponent
  },
  {
    path: "new-payment",
    component: NewPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
