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
import { StocksComponent } from './components/stock-market/stocks/stocks.component';
import { ForexComponent } from './components/stock-market/forex/forex.component';
import { FuturesComponent } from './components/stock-market/futures/futures.component';
import { StockMainComponent } from './components/stock-market/stock-main/stock-main.component';
import { StockDetailComponent } from './components/stock-market/stock-detail/stock-detail.component';
import { ForexDetailComponent } from './components/stock-market/forex-detail/forex-detail.component';
import { TradesComponent } from './components/trades/trades/trades.component';
import { TradesForexComponent } from './components/trades/trades-forex/trades-forex.component';
import { CapitalMainComponent } from './components/capital/capital-main/capital-main.component';
import { CapitalMarginComponent } from './components/capital/capital-margin/capital-margin.component';
import { CapitalCheckingComponent } from './components/capital/capital-checking/capital-checking.component';
import { MarginPopupComponent } from './components/capital/margin-popup/margin-popup.component';
import { CheckingPopupComponent } from './components/capital/checking-popup/checking-popup.component';
import { OptionsComponent } from './components/stock-market/options/options.component';
import { OrdersComponent } from './components/orders/orders/orders.component';
import { CompaniesComponent } from './components/companies/companies/companies.component';
import { CreateCompanyPopupComponent } from './components/companies/create-company-popup/create-company-popup.component';
import { ContractsComponent } from './components/contracts/contracts/contracts.component';
import { AddContractPopupComponent } from './components/contracts/add-contract-popup/add-contract-popup.component';
import { CompanyDetailsComponent } from './components/companies/company-details/company-details.component';
import { CheckingTransactionsPopupComponent } from './components/capital/checking-transactions-popup/checking-transactions-popup.component';
import { MarginTransactionsPopupComponent } from './components/capital/margin-transactions-popup/margin-transactions-popup.component';
import {CountUpModule} from "ngx-countup";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import { OrdersAdminComponent } from './components/orders/orders-admin/orders-admin.component';
import { ConfirmationPopupComponent } from './components/popup/confirmation-popup/confirmation-popup.component';
import {NgToggleModule} from "ng-toggle-button";
import {LottieModule} from "ngx-lottie";
import player from 'lottie-web';
import { ListingsPopupComponent } from './components/capital/listings-popup/listings-popup.component'

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
    StocksComponent,
    ForexComponent,
    FuturesComponent,
    StockMainComponent,
    StockDetailComponent,
    ForexDetailComponent,
    TradesComponent,
    TradesForexComponent,
    CapitalMainComponent,
    CapitalMarginComponent,
    CapitalCheckingComponent,
    MarginPopupComponent,
    CheckingPopupComponent,
    OptionsComponent,
    OrdersComponent,
    CompaniesComponent,
    CreateCompanyPopupComponent,
    ContractsComponent,
    AddContractPopupComponent,
    CompanyDetailsComponent,
    CheckingTransactionsPopupComponent,
    MarginTransactionsPopupComponent,
    OrdersAdminComponent,
    ConfirmationPopupComponent,
    ListingsPopupComponent
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
      primaryColour: '#00B127',
      secondaryColour: '#00B127',
      tertiaryColour: '#00B127',
      animationType: ngxLoadingAnimationTypes.wanderingCubes
    }),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
