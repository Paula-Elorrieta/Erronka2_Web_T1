import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Horario } from '../interface/horarios';
import { User } from '../interface/user';
import { Reunion } from '../interface/reuniones';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  // Mysql url
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}
  erabiltzaileArray: User[] = [];

  getErabiltzaileakEtaMezua(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-users`);
  }

  getErabiltzailea(id: string): Observable<User | undefined> {
    return this.http
      .get<{ users: User[] }>(`${this.apiUrl}/get-users`)
      .pipe(
        map((response) =>
          response.users.find((user) => user.id?.toString() == id)
        )
      );
  }

  getHorarios(userId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/get-horarios/${userId}`);
  }

  getReuniones(): Observable<Reunion[]> {
    const url = `${this.apiUrl}/get-reuniones`;
    return this.http.get<any[]>(url);
  }

  getReunion(id: string): Observable<Reunion | undefined> {
    return this.http
      .get<{ reuniones: Reunion[] }>(`${this.apiUrl}/get-reuniones`)
      .pipe(
        map((response) =>
          response.reuniones.find(
            (reunion) => reunion.id_reunion?.toString() == id
          )
        )
      );
  }
}
