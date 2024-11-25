import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IChangePassword } from '../interfaces/change-password.interface';
import { IUpdatePassword } from '../interfaces/update-password.interface';
import { validateEmail } from '../common/validate-email';

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



  //solicitar cambio de contraseña
  changePassword(correo: string = '', usuario: string = ''): Observable<any> {
    // Validar entrada
    if (!correo && !usuario) {
      return throwError(() => new Error('Debe proporcionar un correo o un nombre de usuario.'));
    }

    // Construir el cuerpo de la solicitud
    const body: IChangePassword = {};
    if (correo) {
      if (!validateEmail(correo)) {
        return throwError(() => new Error('Correo inválido.'));
      }
      body.Correo = correo;
    } else if (usuario) {
      body.Nombre = usuario;
    }

    // Enviar la solicitud HTTP y manejar errores
    return this.http.post(`${this.apiUrl}/changePassword`, body).pipe(
      catchError((error) => {
        console.error('Error al solicitar el cambio de contraseña:', error);
        return throwError(() => new Error('No se pudo procesar la solicitud. Por favor, intente más tarde.'));
      })
    );
  }



  updatePassword(body: IUpdatePassword): Observable<any> {
    // Validar entrada
    if (!body.Code || !body.Contrasena) {
      return throwError(() => new Error('El código y la nueva contraseña son obligatorios.'));
    }
  
    if (body.Contrasena.length < 8) {
      return throwError(() => new Error('La contraseña debe tener al menos 8 caracteres.'));
    }
  
    // Enviar la solicitud HTTP y manejar errores
    return this.http.patch(`${this.apiUrl}/password`, body).pipe(
      catchError((error) => {
        console.error('Error al actualizar la contraseña:', error);
        return throwError(() => new Error('No se pudo actualizar la contraseña. Por favor, intente más tarde.'));
      })
    );
  }

}