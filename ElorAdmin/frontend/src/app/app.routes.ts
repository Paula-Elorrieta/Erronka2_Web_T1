import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    {
        path: 'auth', children: [
            { path: 'login', component: LoginComponent },
            { path: '**', redirectTo: 'login' }
        ]
    },

    { path: '404', component: ErrorPageComponent },
    { path: '**', redirectTo: '404' },

];
