import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../services/query.service';
import { User } from '../../interface/user';
import { Reunion } from '../../interface/Reunion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taula-reuniones',
  imports: [CommonModule,TableModule],
  templateUrl: './taula-reuniones.component.html',
  styleUrls: ['./taula-reuniones.component.css'],
})
export class TaulaReunionesComponent implements OnInit {
  reuniones: Reunion[] = [];
  errorMessage: string = '';
  userlog: User = {};

  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userlog = JSON.parse(storedUser);
      this.reunionesHartu();
    }
  }
  reunionesHartu() {
    const userId = Number(this.userlog.id);
    if (isNaN(userId)) {
      console.error('El ID del usuario no es válido');
      return;
    }

    this.queryService.getReuniones(userId).subscribe({
      next: (data: any) => {
        console.log('Reuniones obtenidas:', data);
        if (data && Array.isArray(data.reuniones)) {
          this.reuniones = data.reuniones;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las reuniones';
        console.error('Error al cargar reuniones:', err);
      },
    });
  }
}
