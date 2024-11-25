import { Injectable } from '@nestjs/common';
import { Carrera } from 'src/entities/carreras.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from 'src/entities/alumnos.entity';
import { Participa } from 'src/entities/participa.entity';
import { Evento } from 'src/entities/eventos.entity';
import { Actividad } from 'src/entities/actividades.entity';
import { Pertenece } from 'src/entities/pertenece.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class EstadisticasService {

  constructor(
    @InjectRepository(Carrera)
    private carreraRepository: Repository<Carrera>,
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
    @InjectRepository(Participa)
    private participaRepository: Repository<Participa>,
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
    @InjectRepository(Pertenece)
    private perteneceRepository: Repository<Pertenece>,
    
  ) {}

  async countAlumnosPorActividad() {
    return await this.actividadRepository
      .createQueryBuilder('actividad')
      .leftJoin('actividad.pertenencias', 'pertenece')
      .select('actividad.Nombre', 'nombreActividad')
      .addSelect('COUNT(pertenece.Id_pertenece_pk)', 'totalAlumnos')
      .groupBy('actividad.Id_actividad_pk')
      .orderBy('totalAlumnos', 'DESC')
      .getRawMany();
  }


  async relacionCarrerasActividades() {
    return await this.carreraRepository
      .createQueryBuilder('carrera')
      .leftJoin('carrera.alumnos', 'alumno') // Relación Carrera -> Alumno
      .leftJoin('alumno.pertenencias', 'pertenece') // Relación Alumno -> Pertenece
      .leftJoin('pertenece.actividad', 'actividad') // Relación Pertenece -> Actividad
      .select('carrera.Nombre', 'carrera')
      .addSelect('COUNT(DISTINCT actividad.Id_actividad_pk)', 'totalActividades')
      .groupBy('carrera.Id_carrera_pk')
      .orderBy('totalActividades', 'DESC')
      .getRawMany();
  }

  async alumnosPorTipoDeActividad() {
    return await this.actividadRepository
      .createQueryBuilder('actividad')
      .leftJoin('actividad.pertenencias', 'pertenece') // Relación Actividad -> Pertenece
      .select('actividad.Tipo', 'tipoActividad') // Seleccionar el tipo de actividad
      .addSelect('COUNT(DISTINCT pertenece.Id_alumnos_fk)', 'totalAlumnos') // Contar alumnos únicos
      .groupBy('actividad.Tipo') // Agrupar por tipo de actividad
      .orderBy('totalAlumnos', 'DESC') // Ordenar por cantidad de alumnos
      .getRawMany();
  }

  async alumnosPorSexoActividad() {
    return await this.actividadRepository
      .createQueryBuilder('actividad')
      .leftJoin('actividad.pertenencias', 'pertenece') // Relación Actividad -> Pertenece
      .leftJoin('pertenece.alumno', 'alumno') // Relación Pertenece -> Alumno
      .select('actividad.Nombre', 'nombreActividad') // Nombre de la actividad
      .addSelect('actividad.Tipo', 'tipoActividad') // Tipo de actividad
      .addSelect('alumno.Sexo', 'sexo') // Sexo de los alumnos
      .addSelect('COUNT(alumno.Id_alumno_pk)', 'totalAlumnos') // Total de alumnos por sexo
      .groupBy('actividad.Id_actividad_pk')
      .addGroupBy('alumno.Sexo') // Agrupar también por sexo
      .orderBy('actividad.Nombre', 'ASC') // Ordenar por nombre de actividad
      .getRawMany();
  }

  async alumnosPorTipoYActividad() {
    return await this.actividadRepository
      .createQueryBuilder('actividad')
      .leftJoin('actividad.pertenencias', 'pertenece') // Relación Actividad -> Pertenece
      .leftJoin('pertenece.alumno', 'alumno') // Relación Pertenece -> Alumno
      .select('actividad.Tipo', 'tipoActividad') // Tipo de actividad
      .addSelect('alumno.Nivel', 'tipoAlumno') // Tipo de alumno
      .addSelect('COUNT(alumno.Id_alumno_pk)', 'totalAlumnos') // Total de alumnos por tipo
      .groupBy('actividad.Tipo') // Agrupar por tipo de actividad
      .addGroupBy('alumno.Nivel') // Agrupar por tipo de alumno
      .orderBy('actividad.Tipo', 'ASC') // Ordenar por tipo de actividad
      .addOrderBy('alumno.Nivel', 'ASC') // Ordenar por tipo de alumno
      .getRawMany();
  }


  
}
