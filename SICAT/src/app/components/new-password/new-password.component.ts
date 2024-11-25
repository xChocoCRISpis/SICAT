import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IUpdatePassword } from '../../interfaces/update-password.interface';
import { NotificationsComponent } from '../notifications/notifications.component';
import { NotificationsService } from '../notifications/notifications.service';
import { Router } from '@angular/router';


@Component({
  selector: 'new-password',
  standalone: true,
  imports: [FormsModule, CommonModule,NotificationsComponent],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  @Input() passCode: string | null = null;

  private readonly router:Router = inject(Router);

  private readonly authService: AuthService = inject(AuthService);
  private readonly notificationService : NotificationsService = inject(NotificationsService);

  // Validar y enviar nueva contraseña
  onSubmit(): void {
    // Validar campos obligatorios
    if (!this.newPassword || !this.confirmPassword) {
      this.notificationService.notify({
        type: 'info',
        title: 'Cambio de Contraseña',
        message: 'Todos los campos son obligatorios.',
      });
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }
  
    // Validar que las contraseñas coincidan
    if (this.newPassword !== this.confirmPassword) {
      this.notificationService.notify({
        type: 'error',
        title: 'Cambio de Contraseña',
        message: 'Las contraseñas no coinciden.',
      });
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
  
    // Validar longitud mínima de la contraseña
    if (this.newPassword.length < 8) {
      this.notificationService.notify({
        type: 'error',
        title: 'Cambio de Contraseña',
        message: 'La contraseña debe tener al menos 8 caracteres.',
      });
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }
  
    // Validar el código de cambio de contraseña
    if (!this.passCode) {
      this.notificationService.notify({
        type: 'error',
        title: 'Cambio de Contraseña',
        message: 'El código de cambio de contraseña no es válido.',
      });
      this.errorMessage = 'El código de cambio de contraseña no es válido.';
      this.router.navigate(['/']);
      return;
    }
  
    // Crear el cuerpo de la solicitud
    const body: IUpdatePassword = {
      Code: this.passCode,
      Contrasena: this.newPassword,
    };
  
    // Llamar al servicio para cambiar la contraseña
    this.authService.updatePassword(body).subscribe({
      next: (response) => {
        // Éxito
        this.notificationService.notify({
          type: 'check',
          title: 'Cambio de Contraseña',
          message: 'Tu contraseña se ha actualizado exitosamente.',
        });
        this.successMessage = 'Tu contraseña se ha actualizado exitosamente.';
        this.errorMessage = '';

        this.router.navigate(['/']);
      },
      error: (error) => {
        // Error
        this.notificationService.notify({
          type: 'error',
          title: 'Cambio de Contraseña',
          message: 'Hubo un error al actualizar la contraseña. Intenta nuevamente.',
        });
        this.errorMessage = 'Hubo un error al actualizar la contraseña. Intenta nuevamente.';
        console.error('Error al actualizar la contraseña:', error);
        this.router.navigate(['/']);

      },
    });
  }
  

  viewContentInput(input: HTMLInputElement) {
    if (input.type === 'password') input.type = 'text';
    else input.type = 'password';
  }

  close():void{
    this.router.navigate(['**']);
  }
}
