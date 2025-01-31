import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../interface/user";
import { QueryService } from "../../services/query.service";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component } from "@angular/core";
import { ArgazkiPipe } from "../../pipes/argazki.pipe";
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { Ciclo, Ciclos } from '../../interface/cliclos';
import { SelectModule } from 'primeng/select';



@Component({
  selector: 'app-gehitu-editatu-erabiltzaile',
  imports: [ArgazkiPipe, AvatarModule, AvatarGroupModule, TranslateModule, Button, CommonModule, FormsModule, InputTextModule, ImageModule, SelectModule],
  templateUrl: './gehitu-editatu-erabiltzaile.component.html',
  styleUrl: './gehitu-editatu-erabiltzaile.component.css'
})
export class GehituEditatuErabiltzaileComponent {
  id: string = '';
  user: User = {};
  userlog: User = JSON.parse(localStorage.getItem('user') || '{}');
  editatzen: boolean = false;
  zikloak: Ciclo[] = [];
  aukeratutakoZikloa: Ciclo = { id: 0, nombre: '' };

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
    this.queryS.getCiclos().subscribe(
      (response: Ciclos) => {
        console.log('Zikloak lortu dira:', response);
        // Mapeamos para que tenga la estructura esperada por p-select
        this.zikloak = response.ciclos;  // TODO: guardar con el ciclo
      },
      (error) => {
        console.error('Errorea zikloak kargatzean:', error);
      }
    );

    this.id = this.activatedRoute.snapshot.params['id'];

    // Kombprobatu erabiltzailea pasatu den
    if (this.id !== '0') {
      this.editatzen = true;
      this.queryS.getErabiltzailea(this.id).subscribe(
        (response) => {
          console.log('Erabiltzailea lortu da:', response);
          if (response) {
            this.user = response;
          } else {
            //alert('Erabiltzailea ez da existitzen');
          }
        },
        (error) => {
          console.error('Errorea erabiltzailea kargatzean:', error);
        }
      );
    }
  }

  gorde() {
    if (this.user.id !== undefined) {
      this.queryS.updateErabiltzailea(this.user).subscribe(
        (response) => {
          console.log('Erabiltzailea editatu da:', response);
          this.router.navigate(['/home/homeadmin']);
        },
        (error) => {
          console.error('Errorea erabiltzailea editatzean:', error);
        }
      );
    } else {
      this.queryS.addErabiltzailea(this.user).subscribe(
        (response) => {
          console.log('Erabiltzailea gehitu da:', response);
          this.router.navigate(['/home/homeadmin']);
        },
        (error) => {
          console.error('Errorea erabiltzailea gehitzean:', error);
        });
    }
  }

  atzera() {
    this.router.navigate(['/home/homeadmin']);
  }
}
