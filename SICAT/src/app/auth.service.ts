import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/usuario/login'; // Cambia esta URL a la de tu backend
  private apiUrl = `${environment.server}/usuario/login`;

  constructor(private http: HttpClient) {}

  login(credentials: { usuario: string, contrasena: string }): Observable<any> {
    console.log("se entro a la funcion de login");
    return this.http.post<any>(this.apiUrl, credentials);
  }
}