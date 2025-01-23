import { QueryService } from './../../services/query.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { User } from '../../interface/user';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-home-irakasle',
  imports: [CommonModule,TableModule,FormsModule ],
  standalone: true,
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css'
})
export class HomeIrakasleComponent implements OnInit {
  constructor(private queryService: QueryService) {}
  horarios: any[] = [];
  userlog: User = {} as User;

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userlog = JSON.parse(storedUser);
      this.loadHorarios();
    } else {
      console.error('No hay un usuario almacenado en localStorage');
    }
  }

  loadHorarios() {
    const userId = Number(this.userlog.id);
    if (isNaN(userId)) {
      console.error('El ID del usuario no es válido');
      return;
    }

    this.queryService.getHorarios(userId).subscribe({
      next: (data: any) => {
        console.log('Horarios obtenidos:', data); // Verifica si los horarios están llegando correctamente
        if (data && Array.isArray(data.horarios)) {
          this.horarios = data.horarios;
          console.log('Horarios asignados:', this.horarios); // Verifica los datos asignados
        } else {
          console.error('La respuesta no contiene un array de horarios válido');
          this.horarios = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);
      },
    });
  }




}
