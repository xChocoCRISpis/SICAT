import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AlumnosService } from '../../pages/alumnos/alumnos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadesService } from '../actividades/actividades.service';
import { NotificationsComponent } from '../notifications/notifications.component';
import { NotificationsService } from '../notifications/notifications.service';

@Component({
  selector: 'add-alumno-to-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationsComponent],
  templateUrl: './add-alumno-to-actividad.component.html',
  styleUrls: ['./add-alumno-to-actividad.component.scss'],
})
export class AddAlumnoToActividadComponent {
  notificationsService = inject(NotificationsService);
  @Input() id_alumno!: number; // ID del alumno recibido desde la modal principal
  @Output() closeModal = new EventEmitter<void>(); // Para cerrar la modal principal

  actividades: any[] = [];
  selectedActividadId: number | null = null;

  constructor(
    private actividadesService: ActividadesService,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit() {
    this.loadActividades();
  }

  loadActividades() {
    this.actividadesService.getActividades().subscribe({
      next: (response) => {
        this.actividades = response; // Asume que la respuesta es un array de actividades
      },
      error: () => {
        this.notificationsService.notify({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar las actividades. Inténtalo de nuevo.',
        });
      },
    });
  }

  agregarAlumno() {
    if (!this.id_alumno || !this.selectedActividadId) {
      this.notificationsService.notify({
        type: 'error',
        title: 'Error',
        message: 'Selecciona una actividad válida.',
      });
      return;
    }

    const actividadId = Number(this.selectedActividadId);
    if (!Number.isInteger(actividadId)) {
      this.notificationsService.notify({
        type: 'error',
        title: 'Error',
        message: 'El ID de la actividad debe ser un número válido.',
      });
      return;
    }

    this.actividadesService.addAlumno(this.id_alumno, actividadId).subscribe({
      next: () => {
        this.notificationsService.notify({
          type: 'check',
          title: 'Éxito',
          message: 'Alumno agregado a la actividad exitosamente.',
        });
        this.cerrarModal(); // Cierra la modal tras guardar
      },
      error: () => {
        this.notificationsService.notify({
          type: 'error',
          title: 'Error',
          message: 'No se pudo agregar al alumno a la actividad. Inténtalo más tarde.',
        });
      },
    });
  }

  cerrarModal() {
    this.closeModal.emit();
  }
}
