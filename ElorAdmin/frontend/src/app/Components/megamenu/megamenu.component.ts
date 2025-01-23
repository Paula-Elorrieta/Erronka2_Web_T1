import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MegaMenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { SwitchHizkuntzaComponent } from "../switch-hizkuntza/switch-hizkuntza.component";
import { User } from '../../interface/user';


@Component({
  selector: 'app-megamenu',
  imports: [MegaMenuModule, CommonModule, ButtonModule, AvatarModule, AvatarGroupModule, ImageModule, SwitchHizkuntzaComponent],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css'
})
export class MegamenuComponent {

  isHovered: boolean = false;
  isHovered2: boolean = false;
  userLogged: User = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }



}
