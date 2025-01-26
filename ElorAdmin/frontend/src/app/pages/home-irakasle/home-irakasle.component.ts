import { QueryService } from './../../services/query.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { User } from '../../interface/user';
import { FormsModule } from '@angular/forms';
import { TaulaOrdutegiComponent } from "../../Components/taula-ordutegi/taula-ordutegi.component";

@Component({
  selector: 'app-home-irakasle',
  imports: [CommonModule, TableModule, FormsModule, TaulaOrdutegiComponent],
  standalone: true,
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css',
})
export class HomeIrakasleComponent {






}
