import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = route.data['allowedRoles'];
    const isAuthorized = this.authService.isAuthorized(allowedRoles);

  
    if (!isAuthorized) {

      this.router.navigate(['acesso-negado']);
    }


    return isAuthorized;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data['allowedRoles'];
    const isAuthorized = this.authService.isAuthorized(allowedRoles);

  
    if (!isAuthorized) {

      this.router.navigate(['acesso-negado']);
    }

    return isAuthorized;
  }
}
