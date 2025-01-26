import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MegaMenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { SwitchHizkuntzaComponent } from '../switch-hizkuntza/switch-hizkuntza.component';
import { User } from '../../interface/user';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-megamenu',
  imports: [
    MegaMenuModule,
    CommonModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    ImageModule,
    SwitchHizkuntzaComponent,
    CommonModule,
  ],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css',
})
export class MegamenuComponent {
  isHovered: boolean = false;
  isHovered2: boolean = false;
  isHovered3: boolean = false;
  userLogged: User = JSON.parse(localStorage.getItem('user') || '{}');
  erabiltzaileak: User[] = [];

  constructor(private router: Router, private query: QueryService) {
    console.log(this.userLogged.tipo_id);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  bilerakIkusi() {
    this.router.navigate(['/pages/bilerak']);
  }

  homeBueltatu() {
    if (this.userLogged.tipo_id === 1 || this.userLogged.tipo_id === 2) {
      this.router.navigate(['/home/homeadmin']);
    } else if (this.userLogged.tipo_id === 3) {
      this.router.navigate(['/home/homeirakasle']);
    } else if (this.userLogged.tipo_id === 4) {
      this.router.navigate(['/home/homeikasle']);
    }
  }

  get ikaslekop() {
    let ikasleKop = 0;
    this.query.getErabiltzaileakEtaMezua().subscribe((response) => {
      console.log('Erabiltzaileak lortu dira:', response);
      this.erabiltzaileak = response.users;
      console.log(this.erabiltzaileak);
    });

    ikasleKop = this.erabiltzaileak.filter(
      (erabiltzaile) => erabiltzaile.tipo_id === 4
    ).length;

    return ikasleKop;
  }


}
