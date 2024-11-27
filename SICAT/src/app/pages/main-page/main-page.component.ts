import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { InitComponent } from '../init/init.component';
import { Router } from '@angular/router';
import { ActividadesComponent } from '../../components/actividades/actividades.component';
import { NavBarService } from '../../services/nav-bar.service';
import { ProfileComponent } from '../profile/profile.component';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { EventosComponent } from '../eventos/eventos.component';
import { EncargadosComponent } from '../encargados/encargados.component';
import { IndicadoresComponent } from '../indicadores/indicadores.component';
import { AuthService } from '../../services/auth.service';
import { NavBarProfesorComponent } from '../nav-bar-profesor/nav-bar-profesor.component';
@Component({
  selector: "app-main-page",
  standalone: true,
  imports: [
    NavBarComponent,
    InitComponent,
    ActividadesComponent,
    ProfileComponent,
    AlumnosComponent,
    EventosComponent,
    EncargadosComponent,
    IndicadoresComponent,
    NavBarProfesorComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  public page: string = 'init';
  public userType: number = 3;

  constructor(private router: Router, private pages: NavBarService, private authService: AuthService) {
    this.pages.pageEmitter.subscribe((value) => {
      this.page = value.toString();
    });
  }

  ngOnInit() {
    this.authService.userType().subscribe((res) => {
      this.userType = res.Tipo;
    });
  }

  public notFound() {
    this.router.navigate(['404-not-found']);
  }
}

