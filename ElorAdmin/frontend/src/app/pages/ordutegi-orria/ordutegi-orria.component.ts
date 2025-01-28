import { Component } from '@angular/core';
import { TaulaOrdutegiComponent } from "../../Components/taula-ordutegi/taula-ordutegi.component";
import { MegamenuComponent } from "../../Components/megamenu/megamenu.component";

@Component({
  selector: 'app-ordutegi-orria',
  imports: [TaulaOrdutegiComponent, MegamenuComponent],
  templateUrl: './ordutegi-orria.component.html',
  styleUrl: './ordutegi-orria.component.css'
})
export class OrdutegiOrriaComponent {

}
