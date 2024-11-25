import { Component } from '@angular/core';
import { AlumnosService } from './alumnos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlumnoComponent } from '../../components/alumno/alumno.component';
import { AddAlumnoComponent } from '../../components/add-alumno/add-alumno.component';
import { AddAlumnoToActividadComponent } from '../../components/add-alumno-to-actividad/add-alumno-to-actividad.component';
import { AddAlumnoToEventoComponent } from '../../components/add-alumno-to-evento/add-alumno-to-evento.component';

@Component({
  selector: 'alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, AlumnoComponent, AddAlumnoComponent, AddAlumnoToActividadComponent, AddAlumnoToEventoComponent],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
  alumnos: any[] = [];
  filteredAlumnos: any[] = [];
  paginatedAlumnos: any[] = [];
  filters: any = {};
  currentPage = 1;
  itemsPerPage = 50;
  totalPages = 1;
  totalAlumnos = 0; // Para saber cuántos alumnos hay en total en la base de datos
  selectedAlumnoId: number | null = null;
  modalOpen = false;

  openValues = {
    openAddAlumnoToActividad: false as boolean,
    openAddAlumnoToEvento: false as boolean,
    openAddAlumno: false as boolean,
    openVerAlumnos: true as boolean
  }

  open(key: keyof typeof this.openValues) {
    Object.keys(this.openValues).forEach(k => {
      this.openValues[k as keyof typeof this.openValues] = k === key;
    });
  }
  

  

  constructor(private alumnosService: AlumnosService, private http: HttpClient) {
    this.loadAlumnos();
  }

  loadAlumnos() {
    const params = new HttpParams()
      .set('page', this.currentPage)
      .set('limit', this.itemsPerPage)
      .set('filters', JSON.stringify(this.filters)); // Puedes ajustar esto según el formato de tu API.

    this.alumnosService.getAlumnos(params).subscribe((res: any) => {
      this.alumnos = [...this.alumnos, ...res.alumnos]; // Añadir más alumnos a la lista
      this.filteredAlumnos = this.alumnos;
      this.totalAlumnos = res.total; // Total de alumnos que hay en la base de datos
      this.updatePagination();
    });
  }

  applyFilter(filterKey: string, event: Event) {
    const target = event.target as HTMLInputElement;
    this.filters[filterKey] = target.value;
    
    this.filteredAlumnos = this.alumnos.filter(alumno => {
      return Object.keys(this.filters).every(key => {
        if (!this.filters[key]) return true;
        if (key === 'semestre') {
          return alumno[key] === parseInt(this.filters[key], 10);
        }
        if (key === 'nombre_corto') {
          return alumno.carrera.nombre_corto.includes(this.filters[key]);
        }
        return alumno[key].includes(this.filters[key]);
      });
    });

    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalAlumnos / this.itemsPerPage);
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedAlumnos = this.filteredAlumnos.slice(start, end);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAlumnos(); // Hacer otra solicitud para cargar más alumnos
    }
  }

  showAlumnoDetails(alumnoId: number) {
    this.selectedAlumnoId = alumnoId;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedAlumnoId = null;
  }
}