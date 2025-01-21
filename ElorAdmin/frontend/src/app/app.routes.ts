import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeIrakasleComponent } from './pages/home-irakasle/home-irakasle.component';
import { HomeIkasleComponent } from './pages/home-ikasle/home-ikasle.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';

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

  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' },
];
