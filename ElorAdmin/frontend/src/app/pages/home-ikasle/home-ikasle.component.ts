import { Component } from '@angular/core';
import { DetailsComponent } from "../../teachers/details/details.component";

@Component({
  selector: 'app-home-ikasle',
  imports: [ DetailsComponent],
  standalone: true,
  templateUrl: './home-ikasle.component.html',
  styleUrl: './home-ikasle.component.css'
})
export class HomeIkasleComponent {

}
