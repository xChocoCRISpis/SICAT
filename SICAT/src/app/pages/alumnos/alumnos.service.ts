import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlumnosService {
  private apiUrl = `${environment.server}/alumnos`; // Cambia esto por tu API

  constructor(private http: HttpClient) {}

  getAlumnos(params: HttpParams): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem("auth_token")}` });
    return this.http.get<any>(`${this.apiUrl}`, { params: params, headers: headers });
  }

  getAlumno(id: number): Observable<any> {
    console.log("getAlumno");
    const headers: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem("auth_token")}` });
    return this.http.get<any>(`${this.apiUrl}/buscar`, { params: { id: id }, headers: headers });
  }

  getAlumnosByActividad(params: HttpParams): Observable<any> {
    console.log(params);
    const headers: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem("auth_token")}` });
    return this.http.get<any>(`${this.apiUrl}/actividad`, { params: params, headers: headers });
  }

  createAlumno(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    });

    return this.http.post<any>(`${this.apiUrl}/create`, formData, { headers });
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
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    });

    const body = { id_alumno, id_actividad };

    return this.http
      .post<any>(`${this.apiUrl}/${id_actividad}/alumnos`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Agregar un alumno a un evento de una actividad.
   * @param id_alumno ID del alumno.
   * @param id_evento ID del evento.
   */
  addAlumnoEvento(id_alumno: number, id_evento: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    });

    const body = { id_alumno, id_evento };

    return this.http
      .post<any>(
        `${this.apiUrl}/${id_evento}/eventos/${id_evento}/alumnos`,
        body,
        { headers }
      )
      .pipe(catchError(this.handleError));
  }
}
