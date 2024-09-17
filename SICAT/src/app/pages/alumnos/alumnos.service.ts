import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = `${environment.server}/alumnos`; // Cambia esto por tu API

  constructor(private http: HttpClient) {}

  getAlumnos(params: HttpParams): Observable<any> {
    const headers:HttpHeaders = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('auth_token')}`})
    return this.http.get<any>(`${this.apiUrl}`, { params:params,headers:headers });
  }

  getAlumno(id:number):Observable<any>{
    console.log("getAlumno")
    const headers:HttpHeaders = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('auth_token')}`})
    return this.http.get<any>(`${this.apiUrl}/buscar`, { params:{id:id},headers:headers });
  }
}
