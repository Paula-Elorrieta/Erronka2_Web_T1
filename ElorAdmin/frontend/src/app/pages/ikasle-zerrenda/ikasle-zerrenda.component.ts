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
export class IkasleZerrendaComponent {
  erabiltzaileak: User[] = [];
  erabiltzaileLogueatua!: User;
  first: number = 0;
  rows: number = 10;
  selectedUser!: User;
  displayDeleteDialog: boolean = false;
  reunionesCount: number = 0;
  filteredUsers: User[] = [];
  filters = {
    dni: '',
    nombre: '',
    apellidos: '',
    ciclo: ''
  };
  ciclosPorUsuario = new Map<number, string>(); // Mapa para asociar usuario con su ciclo

  constructor(
    private queryS: QueryService,
    private authS: AuthService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  ngOnInit() {
    this.erabiltzaileLogueatua = this.authS.getErabiltzaileLogueatua();

    this.queryS.getErabiltzaileakEtaMezua().subscribe(
      (response) => {
        console.log('Usuarios obtenidos:', response.users);
        
        // Filtramos solo los estudiantes
        this.erabiltzaileak = response.users.filter((user: User) => user.tipo_id === 4);
        console.log('Usuarios filtrados (estudiantes):', this.erabiltzaileak);

        this.erabiltzaileak.forEach((erabiltzaile: User) => {
          this.queryS.getCiclosByUser(erabiltzaile.id!).subscribe(
            (response) => {
              console.log(`Ciclos recibidos para usuario ${erabiltzaile.id}:`, response);
          
              // Verificamos si el array 'ciclos' tiene al menos un ciclo
              if (response.ciclos && response.ciclos.length > 0) {
                const ciclo = response.ciclos[0]; // Tomamos el primer ciclo
                this.ciclosPorUsuario.set(erabiltzaile.id!, ciclo.nombre);
                console.log(`Ciclo ${ciclo.nombre} asignado para el usuario ${erabiltzaile.id}`);
              } else {
                // Si no hay ciclos, asignamos 'Desconocido'
                this.ciclosPorUsuario.set(erabiltzaile.id!, 'Desconocido');
                console.warn(`No se ha encontrado ciclo para el usuario ${erabiltzaile.id}`);
              }
            },
            (error) => {
              console.error(`Error al cargar ciclo del usuario ${erabiltzaile.id}:`, error);
              this.ciclosPorUsuario.set(erabiltzaile.id!, 'Desconocido');
            }
          );
          
          
          
        });

        // Asignamos solo los estudiantes a la tabla
        this.filteredUsers = [...this.erabiltzaileak];
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  getCiclo(userId: number): string {
    console.log(`Buscando ciclo para usuario ${userId}:`, this.ciclosPorUsuario.get(userId));
    return this.ciclosPorUsuario.get(userId) || 'Cargando...';
  }


  
  applyFilter() {
    this.filteredUsers = this.erabiltzaileak.filter(erabiltzaile => {
      const cicloNombre = this.ciclosPorUsuario.get(erabiltzaile.id!) || '';
      return (
        (this.filters.dni ? erabiltzaile.dni?.toLowerCase().includes(this.filters.dni.toLowerCase()) : true) &&
        (this.filters.nombre ? erabiltzaile.nombre?.toLowerCase().includes(this.filters.nombre.toLowerCase()) : true) &&
        (this.filters.apellidos ? erabiltzaile.apellidos?.toLowerCase().includes(this.filters.apellidos.toLowerCase()) : true) &&
        (this.filters.ciclo ? cicloNombre.toLowerCase().includes(this.filters.ciclo.toLowerCase()) : true)
      );
    });
  }
  
  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
