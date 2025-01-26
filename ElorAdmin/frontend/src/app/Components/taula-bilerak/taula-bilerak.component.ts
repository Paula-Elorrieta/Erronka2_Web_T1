import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Reunion } from '../../interface/reuniones';
import { User } from '../../interface/user';
import { QueryService } from '../../services/query.service';

@Component({
  selector: 'app-taula-bilerak',
  imports: [CommonModule, TableModule],
  templateUrl: './taula-bilerak.component.html',
  styleUrl: './taula-bilerak.component.css'
})
export class TaulaBilerakComponent implements OnInit {
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
