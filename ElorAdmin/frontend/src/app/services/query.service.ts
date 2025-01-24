import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map
import { User } from '../interface/user';
import { Horario } from '../interface/horarios';
import { Reunion } from '../interface/Reunion';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getErabiltzaileakEtaMezua(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-users`);
  }

  getErabiltzailea(id: string): Observable<User | undefined> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}/get-users`).pipe(
      map((response) => response.users.find((user) => user.id?.toString() == id))
    );
  }

  getHorarios(userId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/get-horarios/${userId}`);
  }

  getReuniones(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/get-reuniones/${userId}`;
    return this.http.get<any[]>(url);
  }





}
