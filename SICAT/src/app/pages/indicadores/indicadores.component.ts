import { Component } from "@angular/core";
import { StatAlumnosPorActividadComponent } from "../../components/stadistics/stat-alumnos-por-actividad/stat-alumnos-por-actividad.component";
import { StatAlumnosSexoComponent } from "../../components/stadistics/stat-alumnos-sexo/stat-alumnos-sexo.component";
import { StatAlumnosTipoActividadComponent } from "../../components/stadistics/stat-alumnos-tipo-actividad/stat-alumnos-tipo-actividad.component";
import { StatAlumnosTipoYActividadComponent } from "../../components/stadistics/stat-alumnos-tipo-y-actividad/stat-alumnos-tipo-y-actividad.component";
import { StatCarrerasActividadesComponent } from "../../components/stadistics/stat-carreras-actividades/stat-carreras-actividades.component";

@Component({
  selector: "indicadores",
  standalone: true,
  imports: [
    StatAlumnosPorActividadComponent,
    StatAlumnosSexoComponent,
    StatAlumnosTipoActividadComponent,
    StatAlumnosTipoYActividadComponent,
    StatCarrerasActividadesComponent,
  ],
  templateUrl: "./indicadores.component.html",
  styleUrl: "./indicadores.component.scss",
})
export class IndicadoresComponent {
  stadisticOpen = {
    alumnosPorActividad: false,
    carreraActividades: false,
    alumnosPorTipoActividad: false,
    alumnosPorSexoActividad: false,
    alumnosPorTipoYActividad: false,
  };

  openStatistic(stat: keyof typeof this.stadisticOpen) {
    // Primero ponemos todas en false
    Object.keys(this.stadisticOpen).forEach(key => {
      this.stadisticOpen[key as keyof typeof this.stadisticOpen] = false;
    });

    // Luego cambiamos solo la que nos interesa a true
    this.stadisticOpen[stat] = true;
  }
}
