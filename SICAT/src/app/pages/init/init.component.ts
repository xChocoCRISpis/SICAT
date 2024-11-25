import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ActividadesComponent } from '../../components/actividades/actividades.component';
import {NavBarService,Pages} from '../../services/nav-bar.service';
import {ChartExampleComponent} from '../../components/chart-example/chart-example.component';


@Component({
  selector: 'app-init',
  standalone: true,
  imports: [NavBarComponent,ActividadesComponent,ChartExampleComponent],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent {
  constructor(public pages:NavBarService){
  }

  changePage(page:Pages){
    this.pages.loadComponent(page);
  }
}
