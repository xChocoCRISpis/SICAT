import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dtos/create-alumno.dto';
import { ValidationTypes, Validator } from 'class-validator';


@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get()
  getAllAlumnos() {
    return this.alumnosService.findAll();
  }

  @Get('/:id')
  getByIdAlumnos(@Param('id', ParseIntPipe) id: number) {
    const alumno = this.alumnosService.findOne(id);
    console.log(alumno);
    return alumno;
  }

  @Post()
  createAlumno(@Body() createAlumnoDto:CreateAlumnoDto) {
    const alumno = this.alumnosService.createAlumno(createAlumnoDto);
    return alumno;
  }
}
