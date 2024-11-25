import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Ajusta según tu estructura de proyecto

@Injectable({
  providedIn: 'root',
})
export class CarrerasService {
  private apiUrl = `${environment.server}/carreras`; // Cambia según tu entorno

  constructor(private http: HttpClient) {}

  getCarreras(): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera el token del almacenamiento local

    if (!token) {
      throw new Error('Token de autenticación no encontrado.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }
}

