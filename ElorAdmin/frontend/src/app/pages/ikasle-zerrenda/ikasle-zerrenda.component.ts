import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interface/user';
import { QueryService } from '../../services/query.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AuthService } from '../../services/auth.service';
import { ArgazkiPipe } from '../../pipes/argazki.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MegamenuComponent } from "../../Components/megamenu/megamenu.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Ciclo } from '../../interface/cliclos';

@Component({
  selector: 'app-ikasle-zerrenda',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    ArgazkiPipe,
    TranslateModule,
    ConfirmDialogModule,
    DialogModule,
    MegamenuComponent,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './ikasle-zerrenda.component.html',
  styleUrl: './ikasle-zerrenda.component.css'
})
export class IkasleZerrendaComponent implements OnInit {
  erabiltzaileak: User[] = [];
  erabiltzaileLogueatua!: User;
  first: number = 0;
  rows: number = 10;
  selectedUser!: User;
  displayDeleteDialog: boolean = false;
  filteredUsers: User[] = [];
  filters = {
    dni: '',
    nombre: '',
    apellidos: '',
    ciclo: ''
  };

  ciclosPorUsuario: Map<number, Ciclo[]> = new Map(); // Asocia ciclos a usuarios

  constructor(
    private queryS: QueryService,
    private authS: AuthService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  ngOnInit() {
    this.erabiltzaileLogueatua = this.authS.getErabiltzaileLogueatua();

    this.queryS.getErabiltzaileakEtaMezua().subscribe(
      (response) => {
        console.log('Erabiltzaileak lortu dira:', response);
        this.erabiltzaileak = response.users;

        this.erabiltzaileak.forEach(erabiltzaile => {
          if (erabiltzaile.tipo_id === 4) {
            this.queryS.getCiclosByUser(erabiltzaile.id!).subscribe(
              (response) => {
                this.ciclosPorUsuario.set(erabiltzaile.id!, response.ciclos);
              },
              (error) => {
                console.error('Errorea zikloak kargatzean:', error);
                this.ciclosPorUsuario.set(erabiltzaile.id!, []);
              }
            );
          }
        });

        this.filteredUsers = [...this.erabiltzaileak];
      },
      (error) => {
        console.error('Errorea erabiltzaileak kargatzean:', error);
      }
    );
  }

  applyFilter() {
    this.filteredUsers = this.erabiltzaileak.filter(erabiltzaile => {
      const ciclosUsuario = this.ciclosPorUsuario.get(erabiltzaile.id!) || [];
      return (
        (this.filters.dni ? erabiltzaile.dni!.toLowerCase().includes(this.filters.dni.toLowerCase()) : true) &&
        (this.filters.nombre ? erabiltzaile.nombre!.toLowerCase().includes(this.filters.nombre.toLowerCase()) : true) &&
        (this.filters.apellidos ? erabiltzaile.apellidos!.toLowerCase().includes(this.filters.apellidos.toLowerCase()) : true) &&
        (this.filters.ciclo ? ciclosUsuario.some(ciclo => ciclo.nombre.toLowerCase().includes(this.filters.ciclo.toLowerCase())) : true)
      );
    });
  }

  getCiclosString(userId: number): string {
    return (this.ciclosPorUsuario.get(userId) || []).map(ciclo => ciclo.nombre).join(', ') || '-';
  }
}
