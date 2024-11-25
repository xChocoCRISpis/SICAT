import { Component } from "@angular/core";
import { StatisticsService } from "../../../services/statistics.service";
import { ChartConfiguration, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "stat-alumnos-por-actividad",
  standalone: true,
  imports: [BaseChartDirective, FormsModule, CommonModule],
  templateUrl: "./stat-alumnos-por-actividad.component.html",
  styleUrl: "./stat-alumnos-por-actividad.component.scss",
})
export class StatAlumnosPorActividadComponent {
  public chartOptions: ChartConfiguration["options"] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Actividades" } },
      y: { beginAtZero: true, title: { display: true, text: "Cantidad de Alumnos" } },
    },
  };

  public chartType: ChartType = "bar"; // Tipo de gráfica inicial
  public chartLabels: string[] = [];
  public chartData = [
    {
      data: [] as number[],
      label: "Alumnos por Actividad",
      backgroundColor: [] as string[], // Colores dinámicos
      borderColor: [] as string[], // Bordes dinámicos
      borderWidth: 1,
    },
  ];
  public totalAlumnos: number = 0; // Total de alumnos
  public filtroMinimo: number = 0; // Valor mínimo para el filtro
  private originalData: any[] = []; // Copia original de los datos para filtrado

  constructor(private estadisticasService: StatisticsService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.estadisticasService.getAlumnosPorActividad().subscribe({
      next: data => {
        this.originalData = data;
        this.actualizarDatos(data);
      },
      error: err => console.error("Error al cargar datos:", err),
    });
  }

  // Genera colores únicos para cada actividad
  private generarColores(cantidad: number): { backgroundColor: string[]; borderColor: string[] } {
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      const randomColor = this.colorAleatorio();
      backgroundColor.push(randomColor);
      borderColor.push(randomColor);
    }
    return { backgroundColor, borderColor };
  }

  // Genera un color aleatorio en formato RGBA
  private colorAleatorio(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  // Actualiza la gráfica con datos filtrados
  actualizarDatos(data: any[]): void {
    this.chartLabels = data.map(item => item.nombreActividad);
    this.chartData[0].data = data.map(item => item.totalAlumnos);
    this.totalAlumnos = data.reduce((sum, item) => sum + parseInt(item.totalAlumnos), 0);

    // Generar colores únicos
    const colores = this.generarColores(data.length);
    this.chartData[0].backgroundColor = colores.backgroundColor;
    this.chartData[0].borderColor = colores.borderColor;
  }

  // Filtrar por el mínimo de alumnos
  filtrarPorMinimo(): void {
    const filtrado = this.originalData.filter(item => item.totalAlumnos >= this.filtroMinimo);
    this.actualizarDatos(filtrado);
  }

  cambiarTipo(tipo: ChartType): void {
    this.chartType = tipo;
  }
}
