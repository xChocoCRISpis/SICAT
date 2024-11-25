import { Component } from "@angular/core";
import { EventosService } from "./eventos.service";
import { CreateEventoDto } from "../../interfaces/create-eventos.interface";
import { UpdateEventoDto } from "../../interfaces/update-evento.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "eventos",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./eventos.component.html",
  styleUrl: "./eventos.component.scss",
})
export class EventosComponent {
  eventos: any[] = [];
  selectedEvento: any = null;

  constructor(private eventosService: EventosService) {}

  isEventActive(fecha: string): boolean {
    const currentDate = new Date();
    const eventDate = new Date(fecha);
    return eventDate >= currentDate;
  }

  ngOnInit(): void {
    this.loadEventos();
  }

  loadEventos() {
    this.eventosService.getEventos().subscribe({
      next: data => (this.eventos = data),
      error: error => console.error("Error al cargar eventos:", error),
    });
  }

  createEvento() {
    const newEvento: CreateEventoDto = {
      Nombre: "Nuevo Evento",
      Lugar: "Aula Magna",
      Fecha: "2024-12-01",
      Hora: "12:00",
      Id_Actividad: 1,
    };

    this.eventosService.createEvento(newEvento).subscribe({
      next: res => {
        console.log("Evento creado:", res);
        this.loadEventos();
      },
      error: error => console.error("Error al crear evento:", error),
    });
  }

  updateEvento() {
    const updateData: UpdateEventoDto = {
      Id_Evento: 1, // ID del evento a actualizar
      Nombre: "Evento Actualizado",
    };

    this.eventosService.updateEvento(updateData).subscribe({
      next: res => {
        console.log("Evento actualizado:", res);
        this.loadEventos();
      },
      error: error => console.error("Error al actualizar evento:", error),
    });
  }

  deleteEvento(id: number) {
    this.eventosService.deleteEvento(id).subscribe({
      next: () => {
        console.log(`Evento con ID ${id} eliminado`);
        this.loadEventos();
      },
      error: error => console.error("Error al eliminar evento:", error),
    });
  }

  viewEvento(id: number) {
    this.eventosService.getEventoById(id).subscribe({
      next: data => (this.selectedEvento = data),
      error: error => console.error("Error al obtener evento:", error),
    });
  }
}
