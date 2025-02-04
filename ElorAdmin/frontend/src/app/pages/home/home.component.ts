import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MegamenuComponent } from "../../Components/megamenu/megamenu.component";
import { AuthService } from '../../services/auth.service';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { HomeIkasleComponent } from "../home-ikasle/home-ikasle.component";
import { HomeIrakasleComponent } from "../home-irakasle/home-irakasle.component";
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomeIkasleComponent, HomeIrakasleComponent, HomeAdminComponent, MegamenuComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userLogged: any;

  constructor(private auth : AuthService, private translateService: TranslateService, private query : QueryService) {
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  ngOnInit() {
    this.userLogged = this.auth.getErabiltzaileLogueatua();
    console.log('Usuario logueado:', this.userLogged);
  }

}
