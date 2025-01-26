import { Component } from '@angular/core';
import { TaulaBilerakComponent } from "../../Components/taula-bilerak/taula-bilerak.component";
import { MegamenuComponent } from "../../Components/megamenu/megamenu.component";

@Component({
  selector: 'app-bilera-orria',
  imports: [TaulaBilerakComponent, MegamenuComponent],
  templateUrl: './bilera-orria.component.html',
  styleUrl: './bilera-orria.component.css'
})
export class BileraOrriaComponent {

}
