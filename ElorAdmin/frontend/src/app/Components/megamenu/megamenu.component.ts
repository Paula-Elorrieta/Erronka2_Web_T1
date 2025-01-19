import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MegaMenuItem } from 'primeng/api';
import { Router } from '@angular/router';
// import {icons } from 'primeng/icons';


@Component({
  selector: 'app-megamenu',
  imports: [MegaMenuModule, CommonModule, ButtonModule, AvatarModule, AvatarGroupModule],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css'
})
export class MegamenuComponent {

  constructor(private router: Router) {}

  items: MegaMenuItem[] = [
    { label: 'HOME', icon: 'pi pi-fw pi-home', command: () => this.router.navigate(['/home']) },
    { label: 'LOGOUT', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() },
  ];

  logout() {
    // Lógica de cierre de sesión
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  

}
