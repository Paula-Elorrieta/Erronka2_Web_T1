import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-irakasle',
  imports: [],
  standalone: true,
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css'
})
export class HomeIrakasleComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('HomeIrakasleComponent#ngOnInit');
  }



}
