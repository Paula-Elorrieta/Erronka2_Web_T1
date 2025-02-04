import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from "../../teachers/details/details.component";

@Component({
  selector: 'app-home-irakasle',
  imports: [CommonModule, TableModule, FormsModule, DetailsComponent],
  standalone: true,
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css',
})
export class HomeIrakasleComponent {






}
