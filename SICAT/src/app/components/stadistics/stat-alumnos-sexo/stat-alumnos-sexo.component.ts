import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'stat-alumnos-sexo',
  standalone: true,
  imports: [BaseChartDirective, FormsModule, CommonModule],
  templateUrl: './stat-alumnos-sexo.component.html',
  styleUrls: ['./stat-alumnos-sexo.component.scss'],
})
export class StatAlumnosSexoComponent implements OnInit {
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      x: { title: { display: true, text: 'Actividades' } },
      y: { beginAtZero: true, title: { display: true, text: 'Cantidad de Alumnos' } },
    },
  };

  public chartType: ChartType = 'bar'; // Tipo de gráfica inicial
  public chartLabels: string[] = []; // Etiquetas de actividades
  public chartData = [
    {
      data: [] as number[], // Masculino
      label: 'Masculino',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      data: [] as number[], // Femenino
      label: 'Femenino',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      data: [] as number[], // No especificado
      label: 'No Especificado',
      backgroundColor: 'rgba(201, 203, 207, 0.5)',
      borderColor: 'rgba(201, 203, 207, 1)',
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
    this.estadisticasService.getAlumnosPorSexoActividad().subscribe({
      next: (data) => {
        this.originalData = data;
        this.actualizarDatos(data);
      },
      error: (err) => console.error('Error al cargar datos:', err),
    });
  }

  // Actualiza la gráfica con los datos
  actualizarDatos(data: any[]): void {
    const masculino: number[] = [];
    const femenino: number[] = [];
    const noEspecificado: number[] = [];

    this.chartLabels = data.map((item) => item.nombreActividad);
    data.forEach((item) => {
      const total = parseInt(item.totalAlumnos, 10);
      this.totalAlumnos += total;

      if (item.sexo === 'M') {
        masculino.push(total);
        femenino.push(0);
        noEspecificado.push(0);
      } else if (item.sexo === 'F') {
        femenino.push(total);
        masculino.push(0);
        noEspecificado.push(0);
      } else {
        noEspecificado.push(total);
        masculino.push(0);
        femenino.push(0);
      }
    });

    this.chartData[0].data = masculino;
    this.chartData[1].data = femenino;
    this.chartData[2].data = noEspecificado;
  }

  cambiarTipo(tipo: ChartType): void {
    this.chartType = tipo;
  }
}

