import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { environment } from '../../environments/environment';
import {LoginServiceService} from './login-services/login-service.service'
import { NotificationsComponent } from "../components/notifications/notifications.component";
import { NotificationsService } from '../components/notifications/notifications.service';
import { LoaderComponent } from '../components/loader/loader.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NotificationsComponent,LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    public version = environment.version;
    public formulario!: FormGroup;
    public front = environment.front;

    constructor(
        private builder:FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationsService) 
    {
      localStorage.clear();
        this.formulario = this.builder.group({
            usuario:["",Validators.required],
            contrasena:["",Validators.required]
        });
    }

    ngOnInit(): void {

    }

    login(): void {
        if (this.formulario.valid) {
          const { usuario, contrasena } = this.formulario.value;
          this.authService.login({ usuario, contrasena }).subscribe(
            response => {
              localStorage.setItem('auth_token', response.token);
              this.router.navigate(["sicat"]);
              console.log({Token:localStorage.getItem('auth_token')});

              this.notificationService.notify({
                type:'check',
                title:"Inicio de sesión",
                message:`Bienvenido ${response.Nombre}`})
            },
            error => {

              console.error('Login failed', error);
              this.notificationService.notify({
                type:'error',
                title:"Inicio de sesión inválido",
                message:"Usuario y/o contraseña incorrectos"})

                localStorage.clear();
                this.formulario.reset();
              // Manejar el error
            }
          );
        }
    }
}

