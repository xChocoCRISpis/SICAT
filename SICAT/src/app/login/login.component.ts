import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { environment } from "../../environments/environment";
import { LoginServiceService } from "./login-services/login-service.service";
import { NotificationsComponent } from "../components/notifications/notifications.component";
import { NotificationsService } from "../components/notifications/notifications.service";
import { LoaderComponent } from "../components/loader/loader.component";
import { ProfileService } from "../pages/profile/profile.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, NotificationsComponent, LoaderComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  public version = environment.version;
  public formulario!: FormGroup;
  public front = environment.front;
  mostrarContrasena = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationsService,
    private profileService: ProfileService
  ) {
    localStorage.clear();
    this.formulario = this.builder.group({
      usuario: ["", Validators.required],
      contrasena: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.formulario.valid) {
      const { usuario, contrasena } = this.formulario.value;
      this.authService.login({ usuario, contrasena }).subscribe(
        response => {
          localStorage.setItem("auth_token", response.token);
          this.getProfile();
          this.router.navigate(["sicat"]);
          console.log({ Token: localStorage.getItem("auth_token") });

          this.notificationService.notify({
            type: "check",
            title: "Inicio de sesión",
            message: `Bienvenido ${response.Nombre}`,
          });
        },
        error => {
          console.error("Login failed", error);
          this.notificationService.notify({
            type: "error",
            title: "Inicio de sesión inválido",
            message: "Usuario y/o contraseña incorrectos",
          });

          localStorage.clear();
          this.formulario.reset();
          // Manejar el error
        }
      );
    }
  }

  getProfile(): void {
    let semestre: "AD" | "EJ";
    new Date().getMonth() >= 0 && new Date().getMonth() <= 5 ? (semestre = "EJ") : (semestre = "AD");
    
    this.profileService
      .profile(new Date().getFullYear().toString(), semestre)
      .subscribe({
        next: (response) => {
          if (!response.usuario || !response.encargado || !response.horarios) {
            throw new Error('Datos de perfil incompletos');
          }

          localStorage.setItem('user_info', JSON.stringify(response.usuario));
          localStorage.setItem('encargado_info', JSON.stringify(response.encargado));
          localStorage.setItem('horarios', JSON.stringify(response.horarios));
          
          this.notificationService.notify({
            type: 'check',
            title: 'Perfil cargado',
            message: `Bienvenido ${response.usuario.username}`,
          });
        },
        error: (error) => {
          console.error('Error al obtener el perfil:', error);
          let errorMessage = 'Error al cargar el perfil';
          
          if (error?.error?.message?.includes('Encargado no encontrado')) {
            errorMessage = 'No se encontró información del encargado';
          } else if (error?.error?.message?.includes('No se encontraron horarios')) {
            errorMessage = 'No se encontraron horarios asignados';
          } else if (error?.error?.message?.includes('ID de usuario')) {
            errorMessage = 'Error en la identificación del usuario';
          }

          this.notificationService.notify({
            type: 'error',
            title: 'Error de acceso',
            message: errorMessage,
          });
          
          localStorage.clear();
          this.router.navigate(['']);
        }
      });
  }

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
