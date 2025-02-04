import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Reunion } from '../../interface/reuniones';
import { User } from '../../interface/user';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { QueryService } from '../../services/query.service';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taula-bilerak',
  standalone: true,
  imports: [CommonModule, TableModule, TranslateModule, ButtonModule],
  templateUrl: './taula-bilerak.component.html',
  styleUrls: ['./taula-bilerak.component.css'],
})
export class TaulaBilerakComponent implements OnInit {
  reuniones: Reunion[] = [];
  errorMessage: string = '';
  userlog: User = {};
  translateSubs: Subscription | undefined;

  constructor(
    private translateService: TranslateService,
    private queryService: QueryService,
    private router: Router
  ) {
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userlog = JSON.parse(storedUser);
      this.reunionesHartu();
    }

    // Hau da hizkuntza aldatzean eguneratzeko. Begiratzen du zein hizkuntza aldatzeko.
    this.translateSubs = this.translateService.onLangChange.subscribe(() => {
      this.eguneratuHizkuntza();
    });
  }

  reunionesHartu() {
    const userId = Number(this.userlog.id);

    this.queryService.getReuniones().subscribe({
      next: (data: any) => {
        if (this.userlog.tipo_id === 1 || this.userlog.tipo_id === 2) {
          // Si el usuario es de tipo 1 o 2, obtiene todas las reuniones
          this.reuniones = data.reuniones;
        } else {
          // Si el usuario es de tipo 3 o 4, filtra por tipo_id y usuario
          this.reuniones = data.reuniones.filter((reunion: Reunion) =>
            this.userlog.tipo_id === 3
              ? reunion.profesor_id === userId
              : reunion.alumno_id === userId
          );
        }
        this.eguneratuHizkuntza();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las reuniones';
      },
    });
  }

  eguneratuHizkuntza() {
    const currentHizkuntza = this.translateService.currentLang;
    this.reuniones.forEach((reunion) => {
      reunion.estado = this.traducirEstado(reunion, currentHizkuntza);
    });
  }

  traducirEstado(reunion: Reunion, idioma: string): string {
    if (idioma === 'eu') {
      return reunion.estado_eus || '';
    } else if (idioma === 'en') {
      return reunion.estado_en || '';
    } else {
      return reunion.estado_es || '';
    }
  }

  ikusiXehetasunak(reunion: Reunion) {
    this.router.navigate(['/pages/details', reunion.id_reunion]);
  }
}
