import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AlumnosService } from '../alumnos/alumnos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumnos-actividad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumnos-actividad.component.html',
  styleUrls: ['./alumnos-actividad.component.scss'],
})
export class AlumnosActividadComponent {
  alumnos: any[] = [];
  filteredAlumnos: any[] = [];
  paginatedAlumnos: any[] = [];
  filters: any = {};
  currentPage = 1;
  itemsPerPage = 50;
  totalPages = 1;
  totalAlumnos = 0;
  loading = false;
  errorMessage = '';

  @Input() id_actividad: number | null = null;
  @Input() name_actividad: string = '';

  constructor(private alumnosService: AlumnosService) {}

  ngOnInit() {
    if (this.id_actividad) {
      this.loadAlumnosByActividad(this.id_actividad);
    } else {
      this.errorMessage = 'No se proporcionó un ID de actividad válido.';
    }
  }

  loadAlumnosByActividad(idActividad: number) {
    this.loading = true;
    this.errorMessage = '';
    const params = new HttpParams()
      .set('id', idActividad.toString())
      .set('page', this.currentPage)
      .set('limit', this.itemsPerPage);

    this.alumnosService.getAlumnosByActividad(params).subscribe({
      next: (res: any) => {
        this.alumnos = res.alumnos || [];
        this.filteredAlumnos = [...this.alumnos];
        this.totalAlumnos = res.total || 0;
        this.updatePagination();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar alumnos por actividad:', error);
        this.errorMessage = 'No se pudieron cargar los alumnos. Intente nuevamente.';
        this.loading = false;
      },
    });
  }

  applyFilter(filterKey: string, event: Event) {
    const target = event.target as HTMLInputElement;
    this.filters[filterKey] = target.value;

    this.filteredAlumnos = this.alumnos.filter((alumno) => {
      return Object.keys(this.filters).every((key) => {
        if (!this.filters[key]) return true;
        if (key === 'semestre') {
          return alumno[key] === parseInt(this.filters[key], 10);
        }
        if (key === 'nombre_corto') {
          return alumno.carrera?.nombre_corto?.includes(this.filters[key]);
        }
        return alumno[key]?.includes(this.filters[key]);
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
}
