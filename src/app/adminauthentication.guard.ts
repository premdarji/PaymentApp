import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


import { adminAuthguardService } from './shared/adminauthguard.service';

@Injectable({
  providedIn: 'root'
})
export class adminAuthenticationGuard implements CanActivate {
  constructor(public auth: adminAuthguardService, public router: Router) {}
  
  canActivate() {
    if (!this.auth.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
