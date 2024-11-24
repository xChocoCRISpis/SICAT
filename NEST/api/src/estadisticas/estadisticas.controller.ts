import { Controller, Get } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';


@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}
  
  @Get('/alumnos-por-actividad')
  async countAlumnosPorActividad() {
    return await this.estadisticasService.countAlumnosPorActividad();
  }

  @Get('/carreras-actividades')
  async relacionCarrerasActividades() {
    return await this.estadisticasService.relacionCarrerasActividades();
  }

  @Get('/alumnos-por-tipo-actividad')
  async alumnosPorTipoDeActividad() {
    return await this.estadisticasService.alumnosPorTipoDeActividad();
  }

  @Get('/alumnos-por-sexo-actividad')
  async alumnosPorSexoActividad() {
    return await this.estadisticasService.alumnosPorSexoActividad();
  }

  @Get('/alumnos-por-tipo-y-actividad')
  async alumnosPorTipoYActividad() {
    return await this.estadisticasService.alumnosPorTipoYActividad();
  }
}
