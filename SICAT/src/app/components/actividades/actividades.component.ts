import { Component, Input, Output } from '@angular/core';
import {ActividadesService} from './actividades.service'
import { timeInterval } from 'rxjs';

interface Actividad {
  Id_actividad_pk: number;
  Nombre: string;
  Tipo: string;
  imagenUrl?: string;
}

@Component({
  selector: 'actividades',
  standalone: true,
  imports: [],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.scss'
})
export class ActividadesComponent {
  @Input()
  tipo:string = ""
  actividades:Actividad[]=[];

  constructor(private actService:ActividadesService){
    
  }

  ngOnInit(){
    this.actService.getActividades().subscribe((res:Actividad[]) => {
      this.actividades=res.filter((actividad:Actividad)=>actividad.Tipo ===this.tipo.toUpperCase());

    });
  }
}
