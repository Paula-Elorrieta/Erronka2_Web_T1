import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaulaOrdutegiComponent } from '../../Components/taula-ordutegi/taula-ordutegi.component';
import { DetailsComponent } from "../../teachers/details/details.component";

@Component({
  selector: 'app-home-ikasle',
  imports: [TaulaOrdutegiComponent, DetailsComponent],
  standalone: true,
  templateUrl: './home-ikasle.component.html',
  styleUrl: './home-ikasle.component.css'
})
export class HomeIkasleComponent {

}
