import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { ActividadesService } from "./actividades.service";
import { CreateActividadeDto } from "./dto/create-actividade.dto";
import { UpdateActividadeDto } from "./dto/update-actividade.dto";
import { AddAlumnoDto } from "./dto/add-alumno.dto";
import { AddAlumnoEventoDto } from "./dto/add-alumno-evento-dto";

@Controller("actividades")
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  create(@Body() createActividadeDto: CreateActividadeDto) {
    return this.actividadesService.create(createActividadeDto);
  }

  @Post("alumno")
  addAlumno(@Body() addAlumnoDto: AddAlumnoDto) {
    return this.actividadesService.addAlumno(addAlumnoDto);
  }

  @Post("alumno/evento")
  addAlumnoEvento(@Body() addAlumnoEventoDto: AddAlumnoEventoDto) {
    return this.actividadesService.addAlumnoEvento(addAlumnoEventoDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const usuario = req["Usuario"];
    return this.actividadesService.findAll(usuario.Id_usuario_pk);
  }

  /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadesService.findOne(+id);
  } */

  @Patch("")
  update(@Body() updateActividadeDto: UpdateActividadeDto) {
    return this.actividadesService.update(updateActividadeDto);
  }

  /*   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadesService.remove(+id);
  } */
}
