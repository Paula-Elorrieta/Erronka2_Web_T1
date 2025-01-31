import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Horario } from '../interface/horarios';
import { User } from '../interface/user';
import { Reunion } from '../interface/reuniones';
import { Ikastetxeak } from '../interface/ikastetzeak';
import { Ciclo, Ciclos } from '../interface/cliclos';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  // Mysql url
  private apiUrl = 'http://localhost:3001';
  private jsUrl = 'http://localhost:3000/IKASTETXEAK';
  private erabiltzaileCount = 0; // Ikasleak
  private ikastetzeak: Ikastetxeak[] = [];

  getIkastetxea(id: string): Ikastetxeak {
    const ikastetxea = this.ikastetzeak.find((ikastetxea) => ikastetxea.CCEN.toString() == id);
    if (!ikastetxea) {
      throw new Error(`Ikastetxea with id ${id} not found`);
    }
    return ikastetxea;
  }

  getIkastetxeak(): Ikastetxeak[] {
    return this.ikastetzeak;
  }

  setIkastetxeak(ikastetxeak: Ikastetxeak[]): void {
    this.ikastetzeak = ikastetxeak;
  }

  updateIkastetxeak(): Observable<any> {
    return this.http.get(`${this.jsUrl}`);
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

  updateErabiltzailea(user: User): Observable<any> {
    console.log('User:', user);
    return this.http.put<User>(`${this.apiUrl}/update-user`, user);
  }

  addErabiltzailea(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/add-user`, user);
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

  getCiclos(): Observable<Ciclos> {
    return this.http.get<Ciclos>(`${this.apiUrl}/get-ciclos`);
  }
}
