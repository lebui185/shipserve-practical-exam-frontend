import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const permittedRoles: string[] = route.data.permittedRoles;
    if (permittedRoles && permittedRoles.length > 0
      && !this.authenticationService.hasAnyRoles(...permittedRoles)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}