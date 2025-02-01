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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
    TranslateModule,
  ],
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css',
})
export class MegamenuComponent {
  isHovered: boolean = false;
  isHovered2: boolean = false;
  isHovered3: boolean = false;
  isHovered4: boolean = false;
  ikasleKop: number = 0;
  userLogged: User = JSON.parse(localStorage.getItem('user') || '{}');
  erabiltzaileak: User[] = [];
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
    this.ikasleKop = this.getikaslekop();
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

  homeBueltatu() {
    if (this.userLogged.tipo_id === 1 || this.userLogged.tipo_id === 2) {
      this.router.navigate(['/home/homeadmin']);
    } else if (this.userLogged.tipo_id === 3) {
      this.router.navigate(['/home/homeirakasle']);
    } else if (this.userLogged.tipo_id === 4) {
      this.router.navigate(['/home/homeikasle']);
    }
  }

  getikaslekop() {
    let ikasleCop = 0; /*
    this.query.getErabiltzaileakEtaMezua().subscribe(
      (response) => {
        console.log('Erabiltzaileak lortu dira:', response);
        this.erabiltzaileak = response.users;
        console.log(this.erabiltzaileak);


        this.erabiltzaileak.forEach( erabiltzaile => {
          if (erabiltzaile.tipo_id === 4) {
            ikasleCop++;
          }
        });
        this.query.setErabiltzaileCount(ikasleCop);
      },
      (error) => {
        console.error('Errorea erabiltzaileak kargatzean:', error);
      }
    );*/

    return ikasleCop;
  }

  getBileraKop() {
    /*
  this.query.getReuniones().subscribe(
    (response) => {
      this.reunionesCount = response.length;
    },
    (error) => {
      console.error('Errorea bilerak kargatzean:', error);
    }
  );*/
  }
}
