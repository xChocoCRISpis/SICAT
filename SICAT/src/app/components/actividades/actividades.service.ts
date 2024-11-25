import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = `${environment.server}/actividades`;

  constructor(private http:HttpClient) { }
  getActividades():Observable<any>{
    const authorization:string= `Bearer ${localStorage.getItem("auth_token")}`;

    const request = this.http.get(`${environment.server}/actividades`,
      {headers:{
        "Authorization" : authorization ,
      }
    });
    return request;
  }

  /**
   * Manejo de errores genérico.
   */
  private handleError(error: any): Observable<never> {
    console.error("Error en el servicio:", error);

    let errorMessage = "Ocurrió un error inesperado.";
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error ${error.status}: ${error.statusText}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Agregar un alumno a una actividad.
   * @param id_alumno ID del alumno.
   * @param id_actividad ID de la actividad.
   */
  addAlumno(id_alumno: number, id_actividad: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    });

    const body = { id_alumno, id_actividad };

    return this.http
      .post<any>(`${this.apiUrl}/alumno`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Agregar un alumno a un evento de una actividad.
   * @param id_alumno ID del alumno.
   * @param id_evento ID del evento.
   */
  addAlumnoEvento(id_alumno: number, id_evento: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    });

    const body = { id_alumno, id_evento };

    return this.http
      .post<any>(`${this.apiUrl}/alumno/evento`, body, { headers })
      .pipe(catchError(this.handleError));
  }
}
