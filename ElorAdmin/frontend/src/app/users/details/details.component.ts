import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Button } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { MegamenuComponent } from '../../Components/megamenu/megamenu.component';
import { User } from '../../interface/user';
import { ArgazkiPipe } from '../../pipes/argazki.pipe';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    ImageModule,
    ArgazkiPipe,
    Button,
    TranslateModule,
    MegamenuComponent,
  ],
  standalone: true,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string = '';
  user: User = {};

  constructor(
    private queryS: QueryService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.queryS.getErabiltzailea(this.id).subscribe(
      (response) => {
        console.log('Erabiltzailea lortu da:', response);
        if (response) {
          this.user = response;
        } else {
          alert('Erabiltzailea ez da existitzen');
        }
      },
      (error) => {
        console.error('Errorea erabiltzailea kargatzean:', error);
      }
    );
  }

  atzera() {
    this.router.navigate(['/home/homeadmin']);
  }
}
