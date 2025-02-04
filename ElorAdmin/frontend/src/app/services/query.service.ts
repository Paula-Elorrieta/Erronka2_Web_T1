import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Horario } from '../interface/horarios';
import { User } from '../interface/user';
import { Reunion } from '../interface/reuniones';
import { Ikastetxeak } from '../interface/ikastetxeak';
import { Ciclos } from '../interface/cliclos';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private apiUrl = 'http://localhost:3001';
  private jsUrl = 'http://localhost:3000/IKASTETXEAK';
  private erabiltzaileCount = 0; // Ikasleak

  getIkastetxea(id: string): Observable<Ikastetxeak | undefined> {
    return this.http
      .get<Ikastetxeak[]>(this.jsUrl)
      .pipe(
        map((response) =>
          response.find((ikastetxea) => ikastetxea.CCEN?.toString() == id)
        )
      );
  }

  getErabiltzaileCount(): number {
    return this.erabiltzaileCount;
  }

  setErabiltzaileCount(count: number): void {
    this.erabiltzaileCount = count;
  }

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

  updateUser(user: User, id: string): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/update-user/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<User>(`${this.apiUrl}/delete-user/${id}`);
  }

  insertErabiltzailea(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/insert-user`, user);
  }

  getHorarios(userId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/get-horarios/${userId}`);
  }

  getHorariosAlumnos(userId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(
      `${this.apiUrl}/get-horarios-alumnos/${userId}`
    );
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

  getCiclos(): Observable<Ciclos> {
    return this.http.get<Ciclos>(`${this.apiUrl}/get-ciclos`);
  }
  getCiclosByUser(userId: number): Observable<Ciclos> {
    return this.http.get<Ciclos>(`${this.apiUrl}/get-ciclos/${userId}`);
  }
}
