import { Component } from "@angular/core";
import { EventosService } from "./eventos.service";
import { CreateEventoDto } from "../../interfaces/create-eventos.interface";
import { UpdateEventoDto } from "../../interfaces/update-evento.interface";
import { CommonModule } from "@angular/common";
import { DetailsEventoComponent } from "../../components/details-evento/details-evento.component";
import { AddEventoComponent } from "../../components/add-evento/add-evento.component";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es-ES');

@Component({
  selector: "eventos",
  standalone: true,
  imports: [CommonModule, DetailsEventoComponent, AddEventoComponent],
  templateUrl: "./eventos.component.html",
  styleUrl: "./eventos.component.scss",
})
export class EventosComponent {
  eventos: any[] = [];
  selectedEvento: any = null;
  isModalOpen: boolean = false;
  isModalOpenEvento: boolean = false;

  openModalEvento() {
    this.isModalOpenEvento = true;
  } 
  
  closeModalEvento() {
    this.isModalOpenEvento = false;
  } 

  closeModal() {
    this.isModalOpen = false;
    this.selectedEvento = null;
  }


  openModal(id: number) {
    this.isModalOpen = true;
    this.selectedEvento = id;
  }

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
