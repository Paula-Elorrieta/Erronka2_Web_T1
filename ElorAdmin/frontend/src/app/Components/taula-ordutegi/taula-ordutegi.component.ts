import { Component } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../interface/user';
import { Dia, Hora, Horario } from '../../interface/horarios';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taula-ordutegi',
  imports: [TableModule, CommonModule],
  templateUrl: './taula-ordutegi.component.html',
  styleUrl: './taula-ordutegi.component.css',
})
export class TaulaOrdutegiComponent {
  constructor(
    private queryService: QueryService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('eu');
    this.translate.use('eu');
  }

  horarios: Horario[] = [];
  userlog: User = {};

  // Nola ikusiko da taula
  taulaOrduak: { [key in Hora]: { [key in Dia]?: string } } = {
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {},
  };

  // Orduak egunen arabera
  egunak = Object.values(Dia);

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userlog = JSON.parse(storedUser);
      this.ordutegiakHartu();
    }

    // Hizkuntza aldatzean taula eguneratu
    this.translate.onLangChange.subscribe(() => {
      this.taulaOrduak = this.datuElkatu(this.horarios);
    });
  }

  // Ordutegi datu guztiak hartu eta gorde, irakasle arabera.
  ordutegiakHartu() {
    const userId = Number(this.userlog.id);
    if (isNaN(userId)) {
      console.error('El ID del usuario no es válido');
      return;
    }

    this.queryService.getHorarios(userId).subscribe({
      next: (data: any) => {
        console.log('Horarios obtenidos:', data);
        if (data && Array.isArray(data.horarios)) {
          this.horarios = data.horarios;
          console.log('Horarios sin traducir:', this.horarios);

          this.taulaOrduak = this.datuElkatu(this.horarios);
          console.log('Tabla de horarios:', this.taulaOrduak);
        }
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);
      },
    });
  }

  // Función para alternar entre los tres campos según el idioma
  datuElkatu(horarios: Horario[]) {
    const tabla: { [key in Hora]: { [key in Dia]?: string } } = {
      '1': {},
      '2': {},
      '3': {},
      '4': {},
      '5': {},
    };

    const idioma = this.translate.currentLang;

    horarios.forEach((horario) => {
      const hora = horario.hora as Hora;
      const dia = horario.dia as Dia;

      // Modulo izena hizkuntza bakoitzaren arabera
      let modulo: string;
      if (idioma === 'eu') {
        modulo = horario.modulo_izena_eu;
      } else if (idioma === 'en') {
        modulo = horario.modulo_izena_en;
      } else {
        modulo = horario.modulo_izena_es;
      }

      if (tabla[hora]) {
        tabla[hora][dia] = modulo;
      }
    });

    return tabla;
  }
}
