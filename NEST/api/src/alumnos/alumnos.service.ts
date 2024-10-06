import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from '../entities/alumnos.entity';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno)
    private readonly alumnosRepository: Repository<Alumno>,
  ) {}

  // Método para obtener todos los alumnos
  async findAll(): Promise<Alumno[]> {
    return this.alumnosRepository.find();
  }

  // Método para obtener un alumno por ID
  async findOne(id: number): Promise<Alumno> {
    return this.alumnosRepository.findOneBy({ Id_alumno_pk: id });
  }

  // Método para crear un nuevo alumno
  async create(alumno: Partial<Alumno>): Promise<Alumno> {
    const newAlumno = this.alumnosRepository.create(alumno);
    return this.alumnosRepository.save(newAlumno);
  }

  // Método para actualizar un alumno
  async update(id: number, alumno: Partial<Alumno>): Promise<Alumno> {
    await this.alumnosRepository.update(id, alumno);
    return this.findOne(id);
  }

  // Método para eliminar un alumno
  async remove(id: number): Promise<void> {
    await this.alumnosRepository.delete(id);
  }
}
