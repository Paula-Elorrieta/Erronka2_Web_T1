import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const tipoId = parsedUser.tipo_id;

      // Egiaztatu erabiltzaile mota eta baimendutako orriak
      const requestedRoute = state.url;
      if (
        (tipoId === 1) && requestedRoute.includes('/homegod') ||
        tipoId === 2 && requestedRoute.includes('/homeadmin') ||
        tipoId === 3 && requestedRoute.includes('/homeirakasle') ||
        tipoId === 4 && requestedRoute.includes('/homeikasle')
      ) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
