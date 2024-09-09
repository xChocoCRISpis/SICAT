import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ActividadesComponent } from '../../components/actividades/actividades.component';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [NavBarComponent,ActividadesComponent],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {
  page:string = "i";
}
