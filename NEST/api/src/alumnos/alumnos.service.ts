import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
    const alumnos = await this.alumnosRepository.find();
    if(!alumnos) throw new NotFoundException('No se encotraron alumnos');

    alumnos.map(alumno=>alumno.Foto = `${process.env.FILE_PATH}alumnos/${alumno.Foto}`)
    return alumnos

  }

  // Método para obtener un alumno por ID
  async findOne(num_control: string){
    const alumno = await this.alumnosRepository.findOneBy({ Num_control:num_control });
    if(!alumno) throw new NotFoundException('No se encontró el alumno con el numero de control proporcionado');

    alumno.Foto = `${process.env.FILE_PATH}alumnos/${alumno.Foto}`;
    console.log("Alumno por numero de control");
    return alumno; 
  }

  // Método para crear un nuevo alumno y guardar la imagen
  async createAlumno(createAlumnoDto: CreateAlumnoDto, imagen: Express.Multer.File) {
    // Cargar la carrera asociada usando el ID del DTO

    //Cuando se usa el array en el where con un mismo objeto se comporta como un AND
    //En objetos distintos los trata como un OR
    const existAlumno = await this.alumnosRepository
      .findOne({where:
        [{Num_control: createAlumnoDto.Num_control},
        {Correo: createAlumnoDto.Correo}]});
    
    if(existAlumno) 
      throw new BadRequestException (`Ya existe este numero de control y/o email`);

    const carrera = await this.carrerasRepository
      .findOneBy({ Id_carrera_pk: createAlumnoDto.carrera });
    
    if (!carrera) {
      throw new BadRequestException(`Carrera con ID ${createAlumnoDto.carrera} no encontrada`);
    }

    // Crear una nueva instancia de Alumno con los datos del DTO
    const newAlumno = this.alumnosRepository.create({
      ...createAlumnoDto,
      carrera, // Asignar la entidad Carrera en lugar del ID
      Foto: imagen?.filename, // Guardar el nombre de la imagen
    });

    // Guardar la nueva entidad en la base de datos
    const savedAlumno = await this.alumnosRepository.save(newAlumno);

    // Devolver el alumno guardado
    return { message: 'Alumno creado correctamente', success: true, alumno: savedAlumno };
  }

  // Método para actualizar un alumno
  /* async update(id: number, alumno: Partial<Alumno>): Promise<Alumno> {
    await this.alumnosRepository.update(id, alumno);
    return this.findOne(id);
  } */

  // Método para eliminar un alumno
  async remove(id: number): Promise<void> {
    await this.alumnosRepository.delete(id);
  }
}
