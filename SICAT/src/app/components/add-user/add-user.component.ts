import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  user = {
    Nombre: '',
    Contrasena: '',
    Correo: '',
    Tipo: 3 , // Valor predeterminado: Usuario Regular
  };

  showPassword: boolean = false; // Para alternar la visibilidad de la contraseña
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (!this.validateInputs()) {
      return;
    }
    if(typeof this.user.Tipo !== 'number')
      this.user.Tipo = parseInt(this.user.Tipo);

    this.authService.createUser(this.user).subscribe({
      next: (response) => {
        this.successMessage = 'Usuario creado exitosamente.';
        this.errorMessage = '';
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage = 'Error al crear usuario: ' + err.error?.message || err.message;
        this.successMessage = '';
      },
    });
  }

  validateInputs(): boolean {
    if (!this.user.Nombre || !this.user.Contrasena || !this.user.Correo) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return false;
    }

    if (this.user.Contrasena.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      return false;
    }

    if (!/[A-Z]/.test(this.user.Contrasena)) {
      this.errorMessage = 'La contraseña debe incluir al menos una letra mayúscula.';
      return false;
    }

    if (!/[a-z]/.test(this.user.Contrasena)) {
      this.errorMessage = 'La contraseña debe incluir al menos una letra minúscula.';
      return false;
    }

    if (!/[0-9]/.test(this.user.Contrasena)) {
      this.errorMessage = 'La contraseña debe incluir al menos un número.';
      return false;
    }

    if (!this.validateEmail(this.user.Correo)) {
      this.errorMessage = 'El correo no es válido.';
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  resetForm(): void {
    this.user = {
      Nombre: '',
      Contrasena: '',
      Correo: '',
      Tipo: 2,
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
