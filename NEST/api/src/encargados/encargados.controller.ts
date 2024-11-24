import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, HttpStatus, Put, Query } from '@nestjs/common';
import { EncargadosService } from './encargados.service';
import { CreateEncargadoDto } from './dto/create-encargado.dto';
import { UpdateEncargadoDto } from './dto/update-encargado.dto';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('encargados')
export class EncargadosController {
  constructor(private readonly encargadosService: EncargadosService) {}

  @Post()
  create(@Body() createEncargadoDto: CreateEncargadoDto, @Req() req: Request) {

    const usuario = req['Usuario'];
    if(usuario.Tipo === 1 || usuario.Tipo === 2) {  
      return this.encargadosService.create(createEncargadoDto);
    }
    throw new HttpException('No tienes permisos para realizar esta acción', HttpStatus.FORBIDDEN);
  }

  @Post('horario')
  createHorario(@Body() createHorarioDto: CreateHorarioDto,  @Req() req: Request) {
    const usuario = req['Usuario'];
    if(usuario.Tipo === 1 || usuario.Tipo=== 2) {
      return this.encargadosService.createHorario(createHorarioDto);
    }
    throw new HttpException('No tienes permisos para realizar esta acción', HttpStatus.FORBIDDEN);
  }

  @Get()
  getAll(@Req() req: Request) {
    const usuario = req['Usuario'];
    return this.encargadosService.getAllEncargados();
    
  }

  @Patch("/")
  update(@Body() updateEncargadoDto: UpdateEncargadoDto, @Query("encargado") id: number, @Req() req: Request) {
    const usuario = req['Usuario']; 

    if(usuario.Tipo === 1 || usuario.Tipo === 2) {
      return this.encargadosService.updateEncargado(updateEncargadoDto,id);
    }
    throw new HttpException('No tienes permisos para realizar esta acción', HttpStatus.FORBIDDEN);
  }

  @Patch("horario")
  updateHorario(@Body() updateHorarioDto: UpdateHorarioDto, @Query("horario") id: number, @Req() req: Request) {
    const usuario = req['Usuario'];
    if(usuario.Tipo === 1 || usuario.Tipo === 2) {
      return this.encargadosService.updateHorario(updateHorarioDto,id);
    }
    throw new HttpException('No tienes permisos para realizar esta acción', HttpStatus.FORBIDDEN);
  }
}
