import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthguardService } from './shared/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public auth: AuthguardService, public router: Router) {}
  
  canActivate() {
    if (!this.auth.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
