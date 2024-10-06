import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';

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
  createAlumno(@Body() body: any) {
    return { ...body, method: 'post' };
  }
}
