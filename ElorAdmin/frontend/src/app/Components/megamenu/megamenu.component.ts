import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MegaMenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { SwitchHizkuntzaComponent } from '../switch-hizkuntza/switch-hizkuntza.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User } from '../../interface/user';
import { QueryService } from '../../services/query.service';
import { Reunion } from '../../interface/reuniones';

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
    TranslateModule,
  ],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css',
})
export class MegamenuComponent implements OnInit {
  isHovered: boolean = false;
  isHovered2: boolean = false;
  isHovered3: boolean = false;
  isHovered4: boolean = false;
  isHovered5: boolean = false;
  ikasleKop: number = 0;
  userLogged: User = JSON.parse(localStorage.getItem('user') || '{}');
  erabiltzaileak: User[] = [];
  bilerak: Reunion[] = [];
  reunionesCount: number = 0;

  constructor(
    private router: Router,
    private query: QueryService,
    private translateService: TranslateService
  ) {
    console.log(this.userLogged.tipo_id);
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  ngOnInit() {
    this.getIkasleKop();
    this.getBileraKop();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  bilerakIkusi() {
    this.router.navigate(['/pages/bilerak']);
  }

  ordutegiaIkusi() {
    this.router.navigate(['/pages/ordutegi']);
  }

  ikasleakIkusi() {
    this.router.navigate(['/pages/ikasleZerrenda']);
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

  getIkasleKop() {
    this.query.getErabiltzaileakEtaMezua().subscribe(
      (response) => {
        console.log('Erabiltzaileak lortu dira:', response);
        this.erabiltzaileak = response.users;

        this.ikasleKop = this.erabiltzaileak.filter(
          (erabiltzaile) => erabiltzaile.tipo_id == 4
        ).length;
        this.query.setErabiltzaileCount(this.ikasleKop);
      },
      (error) => {
        console.error('Errorea erabiltzaileak kargatzean:', error);
      }
    );
  }

  getBileraKop() {
    this.query.getReuniones().subscribe({
      next: (data: any) => {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        this.bilerak = data.reuniones.filter((reunion: Reunion) => {
          if (!reunion.fecha) {
            return false;
          }

          const reunionDate = new Date(reunion.fecha);

          return reunionDate >= startOfDay && reunionDate <= endOfDay;
        });
      },
      error: (err: any) => {
        console.error('Errorea erabiltzaileak kargatzean:', err);
      },
    });
  }
}