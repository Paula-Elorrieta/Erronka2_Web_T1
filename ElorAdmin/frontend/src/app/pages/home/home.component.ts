import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HomeIkasleComponent } from "../home-ikasle/home-ikasle.component";
import { HomeIrakasleComponent } from "../home-irakasle/home-irakasle.component";
import { SidebarMenuComponent } from "../../Components/sidebar-menu/sidebar-menu.component";
import { RouterLink } from '@angular/router';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { MegamenuComponent } from "../../Components/megamenu/megamenu.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomeIkasleComponent, HomeIrakasleComponent, HomeAdminComponent, MegamenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userLogged: any;

  constructor(private auth : AuthService) {}

  ngOnInit() {
    this.userLogged = this.auth.getErabiltzaileLogueatua();
    console.log('Usuario logueado:', this.userLogged);
  }

}
