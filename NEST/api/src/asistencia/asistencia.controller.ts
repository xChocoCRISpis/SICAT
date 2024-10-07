import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Put, ParseIntPipe, BadRequestException, Res } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Request } from 'express';
import { IsNumber } from 'class-validator';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

   // Crear Asistencia
   @Post('crear')
   async crearAsistencia(
      @Body() createAsistenciaDto: CreateAsistenciaDto,
      @Req() req: Request) {
    //id pertenece es del alumno
    const usuario = req['Usuario'];
     const { asistencia } = createAsistenciaDto;
     const crearAsistencia = await this.asistenciaService.crearAsistencia(createAsistenciaDto.id_pertenece,usuario.Id_usuario_pk, asistencia[0]);
     req['logMessage'] = `Registro asistencia en la fecha ${asistencia[0].fecha} con ${asistencia[0].horas} horas para el alumno ${createAsistenciaDto.id_pertenece}`;
        console.log(crearAsistencia);
        return crearAsistencia;
      }

   // Traer todas las asistencias
   @Get('traer')
   async traerTodas(
    @Req() req:Request,
    @Query('alumno') id_pertenece?: string){
    
      let asistencias = await this.asistenciaService.traerTodasEncargado(req['Usuario'].Id_usuario_pk);

      if (id_pertenece) {
        const idPerteneceNum = parseInt(id_pertenece, 10);
        if (isNaN(idPerteneceNum)) {
          throw new BadRequestException('El parámetro "alumno" debe ser un número');
        }
        return asistencias.filter((asistencia)=>{ return asistencia.id_pertenece===idPerteneceNum})
    }
    return asistencias;
  }
 
   // Actualizar asistencia por ID de encargado
   @Put('actualizar')
   async actualizarPorEncargado(
     @Req() req:Request,
     @Body() updateAsistenciaDto: UpdateAsistenciaDto,
   ) {
     const { fecha, horas } = updateAsistenciaDto;
     return this.asistenciaService.actualizarPorEncargado(req['Usuario'].Id_usuario_pk, fecha, horas);
   }
 
   // Eliminar asistencia por ID de encargado
   @Delete('eliminar')
   async eliminarPorEncargado(@Req() req:Request,) {
     return this.asistenciaService.eliminarPorEncargado(req['Usuario'].Id_usuario_pk);
   }
 
   // Obtener las horas por id_pertenece
   @Get('horas')
   async obtenerHoras(
    @Req() req:Request,
    @Query('alumno',ParseIntPipe) id_pertenece:number
  ) {
    console.log(id_pertenece);
     return this.asistenciaService.obtenerHorasPorIdPertenece(id_pertenece);
  }
}
