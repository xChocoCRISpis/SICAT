import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class EncargadosService {
  private baseUrl = `${environment.server}/encargados`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
      if (error.error?.message) {
        errorMessage += ` - Detalles: ${error.error.message}`;
      }
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Token de autenticación no encontrado. Inicie sesión.');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  createEncargado(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  createHorario(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/horario`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getAllEncargados(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateEncargado(id: number, data: any): Observable<any> {
    const params = new HttpParams().set('encargado', id.toString());
    return this.http.patch(`${this.baseUrl}`, data, { headers: this.getHeaders(), params }).pipe(
      catchError(this.handleError)
    );
  }

  updateHorario(id: number, data: any): Observable<any> {
    const params = new HttpParams().set('horario', id.toString());
    return this.http.patch(`${this.baseUrl}/horario`, data, { headers: this.getHeaders(), params }).pipe(
      catchError(this.handleError)
    );
  }

  deleteHorario(id: number): Observable<any> {
    const params = new HttpParams().set('horario', id.toString());
    return this.http.delete(`${this.baseUrl}/horario`, { headers: this.getHeaders(), params }).pipe(
      catchError(this.handleError)
    );
  }

  deleteActividad(idActividad: number, idEncargado: number): Observable<any> {
    const params = new HttpParams()
      .set('actividad', idActividad.toString())
      .set('encargado', idEncargado.toString());
    return this.http.delete(`${this.baseUrl}/actividad`, { headers: this.getHeaders(), params }).pipe(
      catchError(this.handleError)
    );
  }

  avaliableUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/avaliable-users`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
}
