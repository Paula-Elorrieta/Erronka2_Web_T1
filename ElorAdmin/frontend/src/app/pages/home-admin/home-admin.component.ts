import { Component } from '@angular/core';
import { TaulaErabiltzaileComponent } from "../../Components/taula-erabiltzaile/taula-erabiltzaile.component";
import { DetailsComponent } from "../../teachers/details/details.component";

@Component({
  selector: 'app-home-admin',
  imports: [TaulaErabiltzaileComponent, DetailsComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {




}
