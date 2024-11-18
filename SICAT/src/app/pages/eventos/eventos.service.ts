import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { UpdateEventoDto } from "../../interfaces/update-evento.interface";
import { CreateEventoDto } from "../../interfaces/create-eventos.interface";

@Injectable({
  providedIn: "root",
})
export class EventosService {
  private readonly http: HttpClient = inject(HttpClient);
  private apiUrl = `${environment.server}/eventos`;

  constructor() {}

  // Crear un nuevo evento
  createEvento(createEventoDto: CreateEventoDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, createEventoDto, {
      headers: this.getHeaders(),
    });
  }

  // Obtener todos los eventos
  getEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      headers: this.getHeaders(),
    });
  }

  // Obtener un evento por ID
  getEventoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Actualizar un evento
  updateEvento(updateEventoDto: UpdateEventoDto): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, updateEventoDto, {
      headers: this.getHeaders(),
    });
  }

  // Eliminar un evento
  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Headers comunes
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    });
  }
}
