import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root',
})
export class EncargadosService {
  private baseUrl = `${environment.server}/encargados`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Determinar si el error viene del servidor o del cliente
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
      if (error.error?.message) {
        errorMessage += ` - Detalles: ${error.error.message}`;
      }
    }

    // Puedes agregar aquí cualquier lógica adicional, como logs o notificaciones
    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

  createEncargado(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data).pipe(
      catchError(this.handleError)
    );
  }

  createHorario(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/horario`, data).pipe(
      catchError(this.handleError)
    );
  }

  getAllEncargados(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  updateEncargado(id: number, data: any): Observable<any> {
    const params = new HttpParams().set('encargado', id.toString());
    return this.http.patch(`${this.baseUrl}`, data, { params }).pipe(
      catchError(this.handleError)
    );
  }

  updateHorario(id: number, data: any): Observable<any> {
    const params = new HttpParams().set('horario', id.toString());
    return this.http.patch(`${this.baseUrl}/horario`, data, { params }).pipe(
      catchError(this.handleError)
    );
  }

  deleteHorario(id: number): Observable<any> {
    const params = new HttpParams().set('horario', id.toString());
    return this.http.delete(`${this.baseUrl}/horario`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  deleteActividad(idActividad: number, idEncargado: number): Observable<any> {
    const params = new HttpParams()
      .set('actividad', idActividad.toString())
      .set('encargado', idEncargado.toString());
    return this.http.delete(`${this.baseUrl}/actividad`, { params }).pipe(
      catchError(this.handleError)
    );
  }
}
