import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'add-alumno-actividad',
  standalone: true,
  imports: [],
  templateUrl: './add-alumno-actividad.component.html',
  styleUrl: './add-alumno-actividad.component.scss'
})
export class AddAlumnoActividadComponent {
  @Input() open_add_actividad: boolean = false; // Recibe el estado del padre
  @Output() open = new EventEmitter<boolean>(); // Emite eventos al padre

  close(): void {
    this.open.emit(false); // Notifica al padre para cerrar el diálogo
  }
}
