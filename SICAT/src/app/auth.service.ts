import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/usuario/login'; // Cambia esta URL a la de tu backend
  private apiUrl = `${environment.server}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: {usuario:string, contrasena: string}): Observable<any> {

    const {usuario,contrasena} = credentials;

    const esCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(usuario);

    let nombre:string|null = null;
    let correo:string|null = null;
  
    if (esCorreo) correo = usuario;
    else nombre = usuario;

    if(!nombre && !correo)  return throwError(() => new Error("Ingresa un usuario válido"));

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
    });

    if(nombre)
      return this.http.post(`${this.apiUrl}/login`,
        {Nombre:nombre,Contrasena:contrasena},
        {headers}
      )
    
    if(correo)
      return this.http.post(`${this.apiUrl}/login`,
        {Correo:correo,Contrasena:contrasena},
        {headers}
      )
    
    return throwError(() => new Error("Algo salió mal en el proceso de login"));
  }
}