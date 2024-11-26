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

  getDetalleActividad(actividadId: number, alumnoId: number): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ 
      Authorization: `Bearer ${localStorage.getItem("auth_token")}` 
    });
    
    const params = new HttpParams()
      .set('actividad', actividadId)
      .set('alumno', alumnoId);

    return this.http.get<any>(`${this.apiUrl}/detalle-actividad`, { 
      params: params, 
      headers: headers 
    });
  }

}
