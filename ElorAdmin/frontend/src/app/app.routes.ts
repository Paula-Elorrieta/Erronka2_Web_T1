import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeGodComponent } from './pages/home-god/home-god.component';
import { HomeIrakasleComponent } from './pages/home-irakasle/home-irakasle.component';
import { HomeIkasleComponent } from './pages/home-ikasle/home-ikasle.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },

  { path: 'pages/homeGod', component: HomeGodComponent },
  { path: 'pages/homeIrakasle', component: HomeIrakasleComponent },
  { path: 'pages/homeIkasle', component: HomeIkasleComponent },
  { path: 'pages/home', component: HomeComponent },

  { path: '404', component: ErrorPageComponent },

  { path: '**', redirectTo: '404' },
];
