import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reunion } from '../../interface/reuniones';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-bileren-details',
  imports: [],
  templateUrl: './bileren-details.component.html',
  styleUrl: './bileren-details.component.css',
})
export class BilerenDetailsComponent implements OnInit {
  id: string = '';
  reunion: Reunion = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private queryS: QueryService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.queryS.getReunion(this.id).subscribe (
      (response) => {
        console.log('Bilera lortu da:', response);
        if (response) {
          this.reunion = response;
        } else {
          alert('Bilera ez da existitzen');
        }
      },
      (error) => {
        console.error('Errorea bilera kargatzean:', error);
      }
    );
  }
}
