import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { environment } from '../../environments/environment.development';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    public version = environment.version;
    public formulario!: FormGroup;

    constructor(
        private builder:FormBuilder,
        private authService: AuthService,
        private router: Router) 
    {
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
          console.log(usuario, contrasena);
          this.authService.login({ usuario, contrasena }).subscribe(
            response => {
              console.log('Login successful', response);
              this.router.navigate(["sicat"]);
            },
            error => {
              console.error('Login failed', error);
              // Manejar el error
            }
          );
        }
    }
}

