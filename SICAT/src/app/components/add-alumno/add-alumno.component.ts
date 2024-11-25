import { Component, OnInit } from "@angular/core";
import { AlumnosService } from "../../pages/alumnos/alumnos.service"; // Ruta al servicio de Alumnos
import { CarrerasService } from "../../services/carreras.service"; // Ruta al servicio de Carreras
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "add-alumno",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add-alumno.component.html",
  styleUrl: "./add-alumno.component.scss",
})
export class AddAlumnoComponent implements OnInit {
  alumnoData = {
    Num_control: "",
    Nombre: "",
    Ap_paterno: "",
    Ap_materno: "",
    Sexo: "",
    Fecha_nac: "",
    Nivel: null as number | null,
    Telefono: "",
    Correo: "",
    Semestre: null as number | null,
    carrera: null as number | null,
  };

  carreras: any[] = []; // Lista de carreras
  semestres: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // Semestres del 1 al 12
  selectedFile: File | null = null;
  successMessage = "";
  errorMessage = "";

  constructor(
    private alumnosService: AlumnosService,
    private carrerasService: CarrerasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCarreras();
  }

  loadCarreras(): void {
    this.carrerasService.getCarreras().subscribe({
      next: (data) => {
        this.carreras = data;
      },
      error: (err) => {
        console.error("Error al cargar las carreras:", err);
        this.errorMessage = "No se pudieron cargar las carreras.";
      },
    });
  }

  onInputChange(event: Event, field: keyof typeof this.alumnoData): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target) {
      if (field === 'Nivel' || field === 'Semestre' || field === 'carrera') {
        this.alumnoData[field] = target.value ? Number(target.value) : null;
      } else {
        this.alumnoData[field] = target.value || '';
      }
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.selectedFile = target.files[0];
    }
  }

  addAlumno(): void {
    const camposRequeridos: (keyof typeof this.alumnoData)[] = [
      "Num_control", "Nombre", "Ap_paterno", "Ap_materno",
      "Sexo", "Fecha_nac", "Nivel", "Telefono", "Correo",
      "Semestre", "carrera"
    ];
  
    for (const campo of camposRequeridos) {
      if (!this.alumnoData[campo]) {
        this.errorMessage = `El campo ${campo} es obligatorio.`;
        console.error(`Campo inválido: ${campo}`, this.alumnoData[campo]);
        return;
      }
    }
  
    if (!this.selectedFile) {
      this.errorMessage = "Por favor, selecciona una foto.";
      return;
    }
  
    const formData = new FormData();
    Object.entries(this.alumnoData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    formData.append("Foto", this.selectedFile);
  
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    this.alumnosService.createAlumno(formData).subscribe({
      next: () => {
        this.successMessage = "Alumno creado exitosamente.";
        this.errorMessage = "";
        this.router.navigate(["/alumnos"]);
      },
      error: (error) => {
        this.errorMessage = "Error al crear el alumno. Verifica los datos.";
        console.error("Error en creación:", error);
      },
    });
  }
  
  
}
