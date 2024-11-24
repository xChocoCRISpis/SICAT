import { Component, OnInit } from "@angular/core";
import { EncargadosService } from "../../services/encargados.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "add-encargado",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add-encargado.component.html",
  styleUrls: ["./add-encargado.component.scss"],
})
export class AddEncargadoComponent implements OnInit {
  encargado = {
    Nombre: "",
    Ap_paterno: "",
    Ap_materno: "",
    Id_usuarios_fk: null as number | null, // Este será el usuario seleccionado
  };

  availableUsers: any[] = []; // Lista de usuarios disponibles
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private encargadosService: EncargadosService) {}

  ngOnInit(): void {
    this.loadAvailableUsers();
  }

  // Cargar usuarios disponibles
  loadAvailableUsers(): void {
    this.encargadosService.avaliableUser().subscribe({
      next: users => {
        this.availableUsers = users; // Asignar usuarios disponibles a la lista
      },
      error: err => {
        this.errorMessage = "Error al cargar usuarios disponibles";
        console.error(err);
      },
    });
  }

  // Método para asignar un encargado
  addEncargado(): void {
    if (!this.encargado.Id_usuarios_fk) {
      this.errorMessage = "Por favor selecciona un usuario válido.";
      return;
    }

    // Convertir el Id_usuarios_fk a un número entero
    this.encargado.Id_usuarios_fk = parseInt(this.encargado.Id_usuarios_fk as any, 10);

    this.encargadosService.createEncargado(this.encargado).subscribe({
      next: response => {
        this.successMessage = "Encargado asignado exitosamente.";
        this.errorMessage = "";
        this.encargado = { Nombre: "", Ap_paterno: "", Ap_materno: "", Id_usuarios_fk: null };
        this.loadAvailableUsers(); // Actualizar lista de usuarios disponibles
      },
      error: err => {
        this.errorMessage = err.error?.message || "Error al asignar encargado.";
        console.error(err);
      },
    });
  }
}
