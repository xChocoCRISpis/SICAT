import { Component, inject, Inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPasswordComponent } from '../../components/new-password/new-password.component';
import { AuthService } from '../../services/auth.service';
import { validateEmail } from '../../common/validate-email';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { NotificationsService } from '../../components/notifications/notifications.service';

@Component({
  selector: 'page-change-password',
  standalone: true,
  imports: [LoaderComponent, NewPasswordComponent,NotificationsComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  loading: boolean = false;
  isPasswordChange: boolean = false;
  email: string = 'default@email.com';
  passCode: string | null = null;

  authService: AuthService = inject(AuthService);

  notification:NotificationsService = inject(NotificationsService);

  constructor(readonly router: Router, readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    // Suscribirse a los parámetros de la query string
    this.route.queryParamMap.subscribe((params) => {
      this.passCode = params.get('pass-code'); // Obtener el valor de pass-code
      console.log('Código recibido:', this.passCode);
    });
  }

  changePassword(data: HTMLInputElement) {
    this.loading = true;
    // Obtener el valor del input
    const value = data.value.trim();

    // Validar si el valor es un correo electrónico
    const isEmail = validateEmail(value);
    const email = isEmail ? value : '';
    const usuario = !isEmail ? value : '';

    this.authService.changePassword(email, usuario).subscribe({
      next: (response) => {
        console.log('Solicitud exitosa:', response);
        this.email = response.Correo;
        this.loading = false;
        this.isPasswordChange = true; // Marca que la solicitud fue exitosa
      },
      error: (error) => {
        console.error('Error al solicitar cambio de contraseña:', error.message);
        this.cleanInput(data);
        this.notification.notify({
          type:'error',
          title:"Cambio de contraseña",
          message:`No se pudo encontrar usuario con esas características`});
        this.loading = false;
      },
    });
  }


  cleanInput(input:HTMLInputElement):void{
    input.value = '';
  }

  back() {
    this.router.navigate(['/']);
  }
}
