import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// @ts-ignore
import { NgApexchartsModule } from "ng-apexcharts";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/users/login/login.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ActivatePasswordComponent } from './components/users/activate-password/activate-password.component';
import { MyProfileComponent } from './components/users/my-profile/my-profile.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/users/reset-password-request/reset-password-request.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PopupComponent } from './components/popup/popup/popup.component';
import {NgxPaginationModule} from "ngx-pagination";
import {CountUpModule} from "ngx-countup";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import { ConfirmationPopupComponent } from './components/popup/confirmation-popup/confirmation-popup.component';
import {NgToggleModule} from "ng-toggle-button";
import {LottieModule} from "ngx-lottie";
import player from 'lottie-web';
import {MatMenuModule} from "@angular/material/menu";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewPaymentComponent } from "./components/payments/new-payment/new-payment.component";
import { TransferComponent } from "./components/payments/transfer/transfer.component";
import { PaymentRecieversComponent } from "./components/payments/payment-recievers/payment-recievers.component";
import { PaymentRecapComponent } from "./components/payments/payment-recap/payment-recap.component";
import { DomesticPaymentsComponent } from './components/payments/domestic-payments/domestic-payments.component';
import { ExchangeComponent } from './components/payments/exchange/exchange.component';
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import { AddRecieverPopupComponent } from './components/payments/popup/add-reciever-popup/add-reciever-popup.component';
import { TransferApprovalPopupComponent } from './components/payments/popup/transfer-approval-popup/transfer-approval-popup.component';
import { UpdateRecieverPopupComponent } from './components/payments/popup/update-reciever-popup/update-reciever-popup.component';
import { DomesticPaymentDetailsPopupComponent } from './components/payments/popup/domestic-payment-details-popup/domestic-payment-details-popup.component';
import { ExchangeDetailsPopupComponent } from './components/payments/popup/exchange-details-popup/exchange-details-popup.component';


import {DatePipe, NgForOf, NgSwitchCase} from "@angular/common";
import { HomePageComponent } from './components/home-page/home-page.component';
import { AccountsComponent } from './components/accounts/accounts/accounts.component';
import { AccountDetailComponent } from './components/accounts/accounts/account-details/account-detail/account-detail.component';
import { CreateAccountMainComponent } from './components/accounts/create-account/create-account-main/create-account-main.component';
import { CreateBussinessAccountComponent } from './components/accounts/create-account/create-bussiness-account/create-bussiness-account.component';
import { CreateCurrentAccountComponent } from './components/accounts/create-account/create-current-account/create-current-account.component';
import { CreateForeignCurrencyAccountComponent } from './components/accounts/create-account/create-foreign-currency-account/create-foreign-currency-account.component';
import { NaturalPersonsComponent } from './components/natural-persons/natural-persons.component';
import { LegalPersonsComponent } from './components/legal-persons/legal-persons.component';
import { CreateCompanyComponent } from './components/legal-persons/create-company/create-company.component';
import { AddAccountComponent } from './components/users/add-account/add-account.component';


export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUsersComponent,
    AddUserComponent,
    ActivatePasswordComponent,
    MyProfileComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent,
    UpdateUserComponent,
    HomeComponent,
    PopupComponent,
    ConfirmationPopupComponent,
    NewPaymentComponent,
    TransferComponent,
    PaymentRecieversComponent,
    PaymentRecapComponent,
    DomesticPaymentsComponent,
    ExchangeComponent,
    AddRecieverPopupComponent,
    TransferApprovalPopupComponent,
    UpdateRecieverPopupComponent,
    DomesticPaymentDetailsPopupComponent,
    ExchangeDetailsPopupComponent,
    HomePageComponent,
    AccountsComponent,
    AccountDetailComponent,
    CreateAccountMainComponent,
    CreateBussinessAccountComponent,
    CreateCurrentAccountComponent,
    CreateForeignCurrencyAccountComponent,
    NaturalPersonsComponent,
    LegalPersonsComponent,
    CreateCompanyComponent,
    AddAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CountUpModule,
    NgApexchartsModule,
    NgToggleModule.forRoot(),
    NgxLoadingModule.forRoot({
      backdropBorderRadius: '3px',
      primaryColour: '#0275d8',
      secondaryColour: '#0275d8',
      tertiaryColour: '#0275d8',
      animationType: ngxLoadingAnimationTypes.wanderingCubes
    }),
    LottieModule.forRoot({player: playerFactory}),
    MatMenuModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    NgSwitchCase,
    FormsModule,
    NgForOf,
    NgxLoadingModule,
    ReactiveFormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
