import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlumnosService } from '../../pages/alumnos/alumnos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'details-alumno-actividad',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './details-alumno-actividad.component.html',
  styleUrl: './details-alumno-actividad.component.scss'
})
export class DetailsAlumnoActividadComponent {
  alumnoActividad: {
    alumno: any;
    actividad: any;
  } | null = null;
  loading: boolean = false;
  error: string | null = null;
  @Input() open: boolean = false;
  @Input() id_alumno: number | null = null;
  @Input() id_actividad: number | null = null;
  @Output() closeModal = new EventEmitter<void>();


  openValues = {
    openAddAlumnoToActividad: false,
    openAddAlumnoToEvento: false,
  };

  toggleAddAlumnoToActividad(): void {
    this.openValues.openAddAlumnoToActividad = !this.openValues.openAddAlumnoToActividad;
    if(this.openValues.openAddAlumnoToActividad===false){
      this.closeModal.emit();
    }
  }
  
  toggleAddAlumnoToEvento(): void {
    this.openValues.openAddAlumnoToEvento = !this.openValues.openAddAlumnoToEvento;
  
    // Si se cierra la modal de agregar a evento, asegurarse de emitir el cierre
    if (!this.openValues.openAddAlumnoToEvento) {
      this.closeModal.emit();
    }
  }
  

  constructor(private alumnosServices: AlumnosService) {}

  ngOnInit(): void {
    this.loadAlumnoDetails();
  }

  ngOnChanges(): void {
    if (this.open && this.id_alumno) {
      this.loadAlumnoDetails();
    }
  }

  loadAlumnoDetails(): void {
    if (this.id_alumno && this.id_actividad) {
      this.loading = true;
      this.error = null;
      this.alumnosServices.getDetalleActividad(this.id_alumno, this.id_actividad).subscribe(
        (response) => {
          this.alumnoActividad = response;
          this.loading = false;
          console.log('Detalles alumno-actividad:', response);
        },
        (error) => {
          console.error('Error loading alumno-actividad details:', error);
          this.error = 'Error al cargar los detalles del alumno y actividad. Por favor, intente de nuevo.';
          this.loading = false;
        }
      );
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
