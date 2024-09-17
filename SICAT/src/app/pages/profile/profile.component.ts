import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  usuario:any = {};

  encargado:any = {};

  horarios:any[] = [];

  groupedHorarios: any[] = [];

  constructor(private profileService:ProfileService) {

  }

  ngOnInit(){
    let semestre: 'AD'|'EJ';
    new Date().getMonth() >= 0 && new Date().getMonth() <= 5 ? semestre="EJ" : semestre = 'AD'
    const profile = this.profileService
      .profile(new Date().getFullYear().toString(),semestre)
      .subscribe((res:any)=>{
        this.horarios = res.horarios.map((horario:any)=> {
          switch(horario.dia_semana){
            case('LU'):
              horario.dia_semana="LUNES";
              break;
            case('MA'):
              horario.dia_semana='MARTES';
              break;
            case('MI'):
              horario.dia_semana="MIERCÓLES";
              break;
            case('JU'):
              horario.dia_semana='JUEVES';
              break;
            case('VI'):
              horario.dia_semana="VIERNES";
              break;
            case('DO'):
              horario.dia_semana='DOMINGO';
              break;
            default:
              horario.dia_semana = 'UNDEFINED';
              break;
          }
          return horario;
        });
        this.encargado = res.encargado;
        this.usuario = res.usuario;
        this.groupHorariosByDay();
      },error => {
        console.error('Error en la petición:', error);
        console.log('Texto de la respuesta:', error.error?.text);
      });
  }

  groupHorariosByDay() {
    const grouped = this.horarios.reduce((acc:any, horario) => {
      const day = horario.dia_semana;
      if (!acc[day]) {
        acc[day] = { dia_semana: day, actividades: [] };
      }
      acc[day].actividades.push(horario);
      return acc;
    }, {});

    this.groupedHorarios = Object.values(grouped);
  }
}
