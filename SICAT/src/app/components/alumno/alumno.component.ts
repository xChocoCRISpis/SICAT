import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlumnosService } from '../../pages/alumnos/alumnos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddAlumnoToActividadComponent } from '../add-alumno-to-actividad/add-alumno-to-actividad.component';
import { AddAlumnoToEventoComponent } from '../add-alumno-to-evento/add-alumno-to-evento.component';
@Component({
  standalone: true,
  selector: 'alumno-detalle',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
  imports: [CommonModule, FormsModule, AddAlumnoToActividadComponent, AddAlumnoToEventoComponent],
})
export class AlumnoComponent implements OnInit {
  alumno: any = null;
  loading: boolean = false;
  error: string | null = null;
  @Input() open: boolean = false;
  @Input() id_alumno: number | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() errorEvent = new EventEmitter<string>();


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
    console.log(`id alumno : ${this.id_alumno}`)
    if (this.id_alumno) {
      this.loading = true;
      this.error = null;
      this.alumnosServices.getAlumno(this.id_alumno).subscribe(
        (response: any) => {
          this.alumno = response;
          this.loading = false;
          console.log(response);
        },
        (error) => {
          console.error('Error loading alumno details:', error);
          this.error = 'Error al cargar los detalles del alumno. Por favor, intente de nuevo.';
          this.loading = false;
        }
      );
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'img/user-default.png';
  }
}