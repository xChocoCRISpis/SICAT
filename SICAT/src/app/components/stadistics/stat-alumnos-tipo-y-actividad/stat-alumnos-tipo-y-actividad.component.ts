import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'stat-alumnos-y-tipo-actividad',
  standalone: true,
  imports: [BaseChartDirective, FormsModule, CommonModule],
  templateUrl: './stat-alumnos-tipo-y-actividad.component.html',
  styleUrls: ['./stat-alumnos-tipo-y-actividad.component.scss'],
})
export class StatAlumnosTipoYActividadComponent implements OnInit {
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      x: { title: { display: true, text: 'Tipos de Actividad' } },
      y: { beginAtZero: true, title: { display: true, text: 'Cantidad de Alumnos' } },
    },
  };

  public chartType: ChartType = 'bar'; // Tipo de gráfica inicial
  public chartLabels: string[] = []; // Etiquetas de las actividades
  public chartData = [
    {
      data: [] as number[], // Datos para tipo alumno 1
      label: 'Nivel Básico',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      data: [] as number[], // Datos para tipo alumno 2
      label: 'Nivel Avanzado',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
    {
      data: [] as number[], // Datos para tipo alumno null (sin nivel)
      label: 'Sin Nivel',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ];

  private originalData: any[] = []; // Datos originales para filtrado
  public totalAlumnos: number = 0; // Total de alumnos

  constructor(private estadisticasService: StatisticsService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.estadisticasService.getAlumnosPorTipoYActividad().subscribe({
      next: (data) => {
        this.originalData = data;
        this.actualizarDatos(data);
      },
      error: (err) => console.error('Error al cargar datos:', err),
    });
  }

  // Actualiza los datos de la gráfica
  actualizarDatos(data: any[]): void {
    const nivelBasico: number[] = [];
    const nivelAvanzado: number[] = [];
    const sinNivel: number[] = [];

    const labelsSet = new Set<string>();
    data.forEach((item) => {
      labelsSet.add(item.tipoActividad);
    });

    this.chartLabels = Array.from(labelsSet);

    this.chartLabels.forEach((actividad) => {
      const alumnosBasico = data.find(
        (d) => d.tipoActividad === actividad && d.tipoAlumno === 1
      )?.totalAlumnos || 0;

      const alumnosAvanzado = data.find(
        (d) => d.tipoActividad === actividad && d.tipoAlumno === 2
      )?.totalAlumnos || 0;

      const alumnosSinNivel = data.find(
        (d) => d.tipoActividad === actividad && d.tipoAlumno === null
      )?.totalAlumnos || 0;

      nivelBasico.push(Number(alumnosBasico));
      nivelAvanzado.push(Number(alumnosAvanzado));
      sinNivel.push(Number(alumnosSinNivel));
    });

    this.chartData[0].data = nivelBasico;
    this.chartData[1].data = nivelAvanzado;
    this.chartData[2].data = sinNivel;
    this.totalAlumnos = data.reduce(
      (sum, item) => sum + Number(item.totalAlumnos),
      0
    );
  }

  cambiarTipo(tipo: ChartType): void {
    this.chartType = tipo;
  }
}
