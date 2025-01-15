import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
    selector: 'app-login',
    imports: [InputTextModule, PasswordModule, ButtonModule, CardModule,],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

}
