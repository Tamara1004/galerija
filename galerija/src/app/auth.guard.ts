import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

//Za proces autentifikacije, da korisnici ne mogu da idu bilo gde u applikaciji
//bez da se loguju prvo
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //pre nego sto se pristupi odredjenoj ruti, videti da li je korisnik ulogovan
        if(!this.authService.isUserAuthenticated) {
          this.router.navigateByUrl('/home');
        }

      return this.authService.isUserAuthenticated;
  }
}
