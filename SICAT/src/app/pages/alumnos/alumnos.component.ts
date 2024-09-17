import { Component } from '@angular/core';
import { AlumnosService } from './alumnos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlumnoComponent } from '../../components/alumno/alumno.component';

@Component({
  selector: 'alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, AlumnoComponent],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent {
  alumnos: any[] = [];
  filteredAlumnos: any[] = [];
  paginatedAlumnos: any[] = [];
  filters: any = {};
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  selectedAlumnoId: number | null = null;
  modalOpen = false;

  constructor(private alumnosService: AlumnosService, private http: HttpClient) {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.alumnosService.getAlumnos(this.filters).subscribe((res: any) => {
      this.alumnos = res.alumnos;
      this.filteredAlumnos = this.alumnos;
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
    this.totalPages = Math.ceil(this.filteredAlumnos.length / this.itemsPerPage);
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
      this.paginate();
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
