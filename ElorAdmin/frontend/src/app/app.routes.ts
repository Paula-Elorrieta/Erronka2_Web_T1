import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeIrakasleComponent } from './pages/home-irakasle/home-irakasle.component';
import { HomeIkasleComponent } from './pages/home-ikasle/home-ikasle.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { DetailsComponent } from './users/details/details.component';
import { BileraOrriaComponent } from './pages/bilera-orria/bilera-orria.component';
import { BilerenDetailsComponent } from './pages/bileren-details/bileren-details.component';
import { OrdutegiOrriaComponent } from './pages/ordutegi-orria/ordutegi-orria.component';
import { GehituEditatuOrriaComponent } from './pages/gehitu-editatu-orria/gehitu-editatu-orria.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'homeadmin', component: HomeAdminComponent },
      { path: 'homeirakasle', component: HomeIrakasleComponent },
      { path: 'homeikasle', component: HomeIkasleComponent },
    ],
  },

  {
    path: 'pages',
    canActivate: [AuthGuard],
    children: [
      { path: 'bilerak', component: BileraOrriaComponent },
      { path: 'details/:id', component: BilerenDetailsComponent },
      { path: 'ordutegi', component: OrdutegiOrriaComponent },
    ],
  },

  {
    path: 'users',
    canActivate: [AuthGuard],
    children: [
      { path: 'details/:id', component: DetailsComponent },
      { path: 'gehitu', component: GehituEditatuOrriaComponent },
      { path: 'editatu/:id', component: GehituEditatuOrriaComponent },
    ],
  },

  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' },
];
