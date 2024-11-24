import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EncargadosService } from '../../services/encargados.service';
import { ActividadesService } from '../../components/actividades/actividades.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-user-horario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-user-horario.component.html',
  styleUrl: './add-user-horario.component.scss'
})
export class AddUserHorarioComponent implements OnInit{
  @Input() idEncargado: number | null = null; // ID del encargado que recibimos del modal de usuario
  @Output() onClose = new EventEmitter<void>(); // Emite evento para cerrar el modal

  actividades: any[] = [];
  horario = {
    Id_encargado_fk: null as number | null,
    Id_actividad_fk: null as number |null,
    Dia: '',
    Hora_inicio: '',
    Hora_fin: '',
  };

  diasSemana = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
  anos = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  semestres = [
    { value: 'AD', label: 'Agosto-Diciembre' },
    { value: 'EJ', label: 'Enero-Julio' },
  ];

  selectedDia: string = '';
  selectedAno: number | null = null;
  selectedSemestre: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private encargadosService: EncargadosService,
    private actividadesService: ActividadesService
  ) {}

  ngOnInit(): void {
    if (this.idEncargado) {
      this.horario.Id_encargado_fk = this.idEncargado;
    }
    this.loadActividades();
  }

  loadActividades(): void {
    this.actividadesService.getActividades().subscribe({
      next: (actividades) => {
        this.actividades = actividades;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar actividades: ' + err.message;
      },
    });
  }

  formatDia(): string {
    if (this.selectedDia && this.selectedAno && this.selectedSemestre) {
      return `${this.selectedDia.slice(0, 2).toUpperCase()}-${this.selectedAno}-${this.selectedSemestre}`;
    }
    return '';
  }

  createHorario(): void {
    // Formatear el día
    this.horario.Dia = this.formatDia();
  
    // Convertir Id_actividad_fk a número
    this.horario.Id_actividad_fk = Number(this.horario.Id_actividad_fk);
  
    // Asegurar que las horas están en formato HH:mm:ss
    this.horario.Hora_inicio = `${this.horario.Hora_inicio}:00`;
    this.horario.Hora_fin = `${this.horario.Hora_fin}:00`;
  
    // Validar entradas antes de enviar
    if (!this.validateInputs()) {
      return;
    }
  
    // Llamar al servicio para crear el horario
    this.encargadosService.createHorario(this.horario).subscribe({
      next: () => {
        this.successMessage = 'Horario creado exitosamente.';
        this.errorMessage = '';
        this.closeModal();
      },
      error: (err) => {
        this.errorMessage = 'Error al crear horario: ' + err.error?.message || err.message;
      },
    });
  }

  validateInputs(): boolean {
    if (
      !this.horario.Id_actividad_fk ||
      !this.horario.Dia ||
      !this.horario.Hora_inicio ||
      !this.horario.Hora_fin
    ) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return false;
    }

    return true;
  }

  closeModal(): void {
    this.onClose.emit(); // Emite el evento para cerrar el modal
  }
}
