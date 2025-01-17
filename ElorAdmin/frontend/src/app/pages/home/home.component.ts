import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HomeGodComponent } from "../home-god/home-god.component";
import { HomeIkasleComponent } from "../home-ikasle/home-ikasle.component";
import { HomeIrakasleComponent } from "../home-irakasle/home-irakasle.component";
import { SidebarMenuComponent } from "../../Components/sidebar-menu/sidebar-menu.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomeGodComponent, HomeIkasleComponent, HomeIrakasleComponent, SidebarMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userLogged: any;

  constructor(private auth : AuthService) {
    this.userLogged = this.auth.getErabiltzaileLogueatua();
   }

}
