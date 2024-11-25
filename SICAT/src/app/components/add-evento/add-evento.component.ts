import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventosService } from '../../pages/eventos/eventos.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ActividadesService } from '../actividades/actividades.service';

@Component({
  selector: 'add-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>(); // Para cerrar la modal

  actividades: any[] = []; // Lista de actividades cargadas

  formData: any = {
    Nombre: '',
    Lugar: '',
    Fecha: '',
    Hora: '',
    Id_Actividad: null as null | number,
  };

  constructor(
    private eventosService: EventosService,
    private notificationsService: NotificationsService,
    private actividadesService: ActividadesService
  ) {}

  ngOnInit(): void {
    this.loadActividades();
  }

  loadActividades(): void {
    this.actividadesService.getActividades().subscribe({
      next: (response) => {
        this.actividades = response; // Asume que la respuesta es un array de actividades
      },
      error: () => {
        this.notificationsService.notify({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar las actividades. Inténtalo más tarde.',
        });
      },
    });
  }

  createEvento(): void {
    if (
      !this.formData.Nombre ||
      !this.formData.Lugar ||
      !this.formData.Fecha ||
      !this.formData.Hora ||
      !this.formData.Id_Actividad
    ) {
      this.notificationsService.notify({
        type: 'error',
        title: 'Error',
        message: 'Todos los campos son obligatorios.',
      });
      return;
    }
    
    this.formData.Id_Actividad = Number(this.formData.Id_Actividad);


    this.eventosService.createEvento(this.formData).subscribe({
      next: () => {
        this.notificationsService.notify({
          type: 'check',
          title: 'Éxito',
          message: 'Evento creado exitosamente.',
        });
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al crear el evento:', err);
        this.notificationsService.notify({
          type: 'error',
          title: 'Error',
          message: 'No se pudo crear el evento. Inténtalo más tarde.',
        });
      },
    });
  }

  cerrarModal(): void {
    this.closeModal.emit();
  }
}
