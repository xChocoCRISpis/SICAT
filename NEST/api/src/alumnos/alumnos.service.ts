import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from '../entities/alumnos.entity';
import { Carrera } from '../entities/carreras.entity';
import { CreateAlumnoDto } from './dtos/create-alumno.dto';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno) private readonly alumnosRepository: Repository<Alumno>,
    @InjectRepository(Carrera) private readonly carrerasRepository: Repository<Carrera>,
  ){

  }

  // Método para obtener todos los alumnos
  async findAll(){
    return await this.alumnosRepository.find();
  }

  // Método para obtener un alumno por ID
  async findOne(id: number){
    const alumno = await this.alumnosRepository.findOneBy({ Id_alumno_pk: id });
    if(!alumno) throw new NotFoundException('No se encontró el alumno con el id proporcionado');

    return alumno; 
  }

  // Método para crear un nuevo alumno
  async createAlumno(createAlumnoDto: CreateAlumnoDto){
     // Cargar la carrera asociada usando el ID del DTO
     const carrera = await this.carrerasRepository.findOneBy({Id_carrera_pk: createAlumnoDto.carrera,});
    
     if (!carrera) {
       throw new Error(`Carrera con ID ${createAlumnoDto.carrera} no encontrada`);
     }
 
     // Crear una nueva instancia de Alumno con los datos del DTO
     const newAlumno = this.alumnosRepository.create({
       ...createAlumnoDto,
       carrera,  // Asignar la entidad Carrera en lugar del ID
     });
 
     // Guardar la nueva entidad en la base de datos
     const savedAlumno = await this.alumnosRepository.save(newAlumno);
 
     // Devolver el alumno guardado
     return {message:"alumno creado correctamente",success:"true"};
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
