import { Component, Inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-change-password',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  loading:boolean = false;
  isPasswordChange:boolean = false;
  email:string = "crisneeda@gmail.com";
  passCode:string|null=null;

  constructor(readonly router:Router, readonly route:ActivatedRoute){

  }

  ngOnInit(): void {
    // Suscribirse a los parámetros de la query string
    this.route.queryParamMap.subscribe((params) => {
      this.passCode = params.get('pass-code'); // Obtener el valor de pass-code
      console.log('Código recibido:', this.passCode);
    });
  }

  change_email() {
    this.loading = true;

    // Simular una solicitud de cambio de contraseña con retraso
    setTimeout(() => {
      this.isPasswordChange = true; // Marca que la contraseña fue cambiada
      this.loading = false; // Detener el estado de carga
    }, 3000); // Cambiado a 3 segundos para pruebas más rápidas
  }

  back(){
    this.router.navigate(["/"]);
  }
}
