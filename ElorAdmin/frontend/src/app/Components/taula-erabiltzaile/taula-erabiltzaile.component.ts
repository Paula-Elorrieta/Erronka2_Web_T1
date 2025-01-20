import { Component, OnInit } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interface/user';
import { QueryService } from '../../services/query.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-taula-erabiltzaile',
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './taula-erabiltzaile.component.html',
  styleUrl: './taula-erabiltzaile.component.css',
})
export class TaulaErabiltzaileComponent implements OnInit {
  erabiltzaileak: User[] = [];
  erabiltzaileLogueatua!: User;
  first: number = 0;
  rows: number = 10;

  constructor(private queryS: QueryService, private authS : AuthService) {}

  ngOnInit() {
    this.erabiltzaileLogueatua = this.authS.getErabiltzaileLogueatua();

    this.queryS.getErabiltzaileakEtaMezua().subscribe(
      (response) => {
        console.log('Erabiltzaileak lortu dira:', response);
        this.erabiltzaileak = response.users;
        console.log(this.erabiltzaileak);
      },
      (error) => {
        console.error('Errorea erabiltzaileak kargatzean:', error);
      }
    );
  }
  

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first >= this.erabiltzaileak.length - this.rows;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
