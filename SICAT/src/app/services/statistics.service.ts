import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  private baseUrl = `${environment.server}/estadisticas`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("El token de autenticación no está disponible");
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error del servidor: ${error.status} ${error.statusText}`;
      if (error.error?.message) {
        errorMessage += ` - Detalles: ${error.error.message}`;
      }
    }

    // Log del error para depuración
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Alumnos por actividad
  getAlumnosPorActividad(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/alumnos-por-actividad`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Carreras relacionadas con actividades
  getCarrerasActividades(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/carreras-actividades`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Alumnos por tipo de actividad (Cultural o Deportiva)
  getAlumnosPorTipoActividad(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/alumnos-por-tipo-actividad`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Alumnos por sexo relacionados con actividades
  getAlumnosPorSexoActividad(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/alumnos-por-sexo-actividad`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Alumnos por tipo relacionados con actividades
  getAlumnosPorTipoYActividad(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/alumnos-por-tipo-y-actividad`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}
