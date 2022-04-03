import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild  {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(routeSnapshot: ActivatedRouteSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
    let redirect = routeSnapshot.data['authGuardRedirect'];
    let isUserLoggedIn$ = this.authService.estaAutenticado();

    if (!isUserLoggedIn$) {

      this.router.navigate([redirect]);
    } 

    return isUserLoggedIn$;
  }

  canActivateChild(
    routeSnapshot: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let redirect = routeSnapshot.data['authGuardRedirect'];
    let isUserLoggedIn$ = this.authService.estaAutenticado();

    if (!isUserLoggedIn$) {

      this.router.navigate(['/'+redirect]);
    } 

    return isUserLoggedIn$;
  }
}