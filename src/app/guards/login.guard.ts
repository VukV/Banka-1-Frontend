import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CurrentUserService} from "../services/user/current-user.service";
import jwtDecode from "jwt-decode";
import {JwtPayload} from "../model/user/jwt-payload";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private currentUserService: CurrentUserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //OTKOMENTARISATI ZA PRISTUP SVIM STRANICAMA PRILIKOM DEVELOPMENT-A
    //return true;

    //role za svaku rutu su definisane u router-u
    let roles = route.data['roles'];
    let token = this.currentUserService.getToken();

    //proverava postojanje tokena, odnosno da li je korisnik logovan
    if(token){
      if(roles === undefined || roles.length == 0){
        return true;
      }

      //proverava da li korisnik ima rolu, ukoliko su role definisane za rutu
      for(let userRole of this.currentUserService.getUserRoles()){
        if(roles.includes(userRole)){
          return true;
        }
      }

      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
