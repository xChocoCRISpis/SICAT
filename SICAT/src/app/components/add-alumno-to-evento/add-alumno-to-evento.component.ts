import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../notifications/notifications.service';
import { ActividadesService } from '../actividades/actividades.service';
import { EventosService } from '../../pages/eventos/eventos.service';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'add-alumno-to-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationsComponent],
  templateUrl: './add-alumno-to-evento.component.html',
  styleUrls: ['./add-alumno-to-evento.component.scss']
})
export class AddAlumnoToEventoComponent implements OnInit {
  notificationsService = inject(NotificationsService);
  @Input() id_alumno!: number; // ID del alumno recibido desde la modal principal
  @Output() closeModal = new EventEmitter<void>(); // Para cerrar la modal

  eventos: any[] = [];
  selectedEventoId: number | null = null;

  constructor(
    private actividadesService: ActividadesService,
    private eventosService:EventosService
  ) {}

  ngOnInit() {
    this.loadEventos();
  }

  loadEventos() {
    this.eventosService.getEventos().subscribe({
      next: (response) => {
        console.log(response);
        this.eventos = response; // Asume que la respuesta es un array de eventos
      },
      error: () => {
        this.notificationsService.notify({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los eventos. Inténtalo de nuevo.',
        });
      },
    });
  }

  agregarAlumnoEvento() {
    if (!this.id_alumno || !this.selectedEventoId) {
      this.notificationsService.notify({
        type: 'error',
        title: 'Error',
        message: 'Selecciona un evento válido.',
      });
      return;
    }

    const eventoId = Number(this.selectedEventoId);
    if (!Number.isInteger(eventoId)) {
      this.notificationsService.notify({
        type: 'error',
        title: 'Error',
        message: 'El ID del evento debe ser un número válido.',
      });
      return;
    }

    this.actividadesService.addAlumnoEvento(this.id_alumno, eventoId).subscribe({
      next: () => {
        this.notificationsService.notify({
          type: 'check',
          title: 'Éxito',
          message: 'Alumno agregado al evento exitosamente.',
        });
        this.cerrarModal(); // Cierra la modal tras guardar
      },
      error: () => {
        this.notificationsService.notify({
          type: 'error',
          title: 'Error',
          message: 'No se pudo agregar al alumno al evento. Inténtalo más tarde.',
        });
      },
    });
  }

  cerrarModal() {
    this.closeModal.emit();
  }
}
