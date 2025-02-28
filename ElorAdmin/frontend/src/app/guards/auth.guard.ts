import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      const tipoId = parsedUser.tipo_id;

      if (this.EgiaztatuBaimena(tipoId, state.url)) {
        return true;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  private EgiaztatuBaimena(tipoId: number, routeUrl: string): boolean {
    const accessMap: { [key: number]: string[] } = {
      1: ['/home/homeadmin', '/users/details', '/users/gehitu', '/users/editatu', '/pages/bilerak', '/pages/details'], // GOD
      2: ['/home/homeadmin', '/users/details', '/users/gehitu', '/users/editatu', '/pages/bilerak', '/pages/details'], // ADMIN
      3: ['/home/homeirakasle', '/pages/bilerak', '/pages/ordutegi', '/pages/details', 'pages/ikasleZerrenda'], // IRAKASLE
      4: ['/home/homeikasle', 'pages/ordutegi', '/pages/bilerak'], // IKASLE
    };


    const allowedPaths = accessMap[tipoId] || [];

    return allowedPaths.some((allowedPath) => routeUrl.includes(allowedPath));
  }
}
