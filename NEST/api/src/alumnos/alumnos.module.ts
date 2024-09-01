import { Module } from '@nestjs/common';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Alumno}  from '../entities/alumnos.entity';
import {Carrera}  from '../entities/carreras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno,Carrera])],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
