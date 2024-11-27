import { Component, TemplateRef, ViewChild } from "@angular/core";
import { StatAlumnosPorActividadComponent } from "../../components/stadistics/stat-alumnos-por-actividad/stat-alumnos-por-actividad.component";
import { StatAlumnosSexoComponent } from "../../components/stadistics/stat-alumnos-sexo/stat-alumnos-sexo.component";
import { StatAlumnosTipoActividadComponent } from "../../components/stadistics/stat-alumnos-tipo-actividad/stat-alumnos-tipo-actividad.component";
import { StatAlumnosTipoYActividadComponent } from "../../components/stadistics/stat-alumnos-tipo-y-actividad/stat-alumnos-tipo-y-actividad.component";
import { StatCarrerasActividadesComponent } from "../../components/stadistics/stat-carreras-actividades/stat-carreras-actividades.component";
import { CommonModule } from "@angular/common"; 
import { ContentNavBarComponent } from "../../components/content-nav-bar/content-nav-bar.component";
import { ContentNavBarService } from "../../services/content-nav-bar.service";
@Component({
  selector: "indicadores",
  standalone: true,
  imports: [
    StatAlumnosPorActividadComponent,
    StatAlumnosSexoComponent,
    StatAlumnosTipoActividadComponent,
    StatAlumnosTipoYActividadComponent,
    StatCarrerasActividadesComponent,
    CommonModule,
    ContentNavBarComponent
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

  @ViewChild('navBarContent') navBarContent!: TemplateRef<any>;


  constructor(    
    private contentNavBarService: ContentNavBarService
  ){}

  ngAfterViewInit() {
    this.contentNavBarService.setContent(this.navBarContent);
  }

  ngOnDestroy() {
    this.contentNavBarService.clearContent();
  }

  openStatistic(stat: keyof typeof this.stadisticOpen) {
    // Primero ponemos todas en false
    Object.keys(this.stadisticOpen).forEach(key => {
      this.stadisticOpen[key as keyof typeof this.stadisticOpen] = false;
    });

    // Luego cambiamos solo la que nos interesa a true
    this.stadisticOpen[stat] = true;
  }

  isAllStatisticsClosed(): boolean {
    return Object.values(this.stadisticOpen).every(value => value === false);
  }
}
