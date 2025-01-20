import { Component } from '@angular/core';
import { TaulaErabiltzaileComponent } from "../../Components/taula-erabiltzaile/taula-erabiltzaile.component";

@Component({
  selector: 'app-home-god',
  standalone: true,
  templateUrl: './home-god.component.html',
  styleUrls: ['./home-god.component.css'],
  imports: [TaulaErabiltzaileComponent]
})
export class HomeGodComponent {}

