import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateActividadeDto } from "./dto/create-actividade.dto";
import { UpdateActividadeDto } from "./dto/update-actividade.dto";
import { Repository } from "typeorm";
import { Usuario } from "src/entities/usuarios.entity";
import { Encargado } from "src/entities/encargados.entity";
import { EncargadoDetalle } from "src/entities/encargados_detalle.entity";
import { Actividad } from "src/entities/actividades.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Alumno } from "src/entities/alumnos.entity";
import { Participa } from "src/entities/participa.entity";
import { AddAlumnoDto } from "./dto/add-alumno.dto";
import { Pertenece } from "src/entities/pertenece.entity";
import { Evento } from "src/entities/eventos.entity";
import { AddAlumnoEventoDto } from "./dto/add-alumno-evento-dto";

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Encargado)
    private readonly encargadoRepo: Repository<Encargado>,
    @InjectRepository(EncargadoDetalle)
    private readonly encargadoDetalleRepo: Repository<EncargadoDetalle>,
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
    @InjectRepository(Alumno)
    private readonly alumnoRepo: Repository<Alumno>,
    @InjectRepository(Participa)
    private readonly participaRepo: Repository<Participa>,  
    @InjectRepository(Pertenece)
    private readonly perteneceRepo: Repository<Pertenece>,
    @InjectRepository(Evento)
    private readonly eventosRepo: Repository<Evento>
  ) {}

  async create(createActividadeDto: CreateActividadeDto) {
    const result = await this.actividadRepo.save(createActividadeDto);
    return result;
  }

  async findAll(Id_usuario: number): Promise<any> {
    const result = await this.actividadRepo
      .createQueryBuilder("a") // Alias para la tabla `tb_actividades`
      .select(["a.Id_actividad_pk", "a.Nombre", "a.Tipo"])
      .innerJoin("a.detalles", "ed") // Relación entre `tb_actividades` y `tb_encargados_detalle`
      .innerJoin("ed.encargado", "e") // Relación entre `tb_encargados_detalle` y `tb_encargados`
      .where("e.id_usuarios_fk = :Id_usuario", { Id_usuario }) // Condición para `id_usuarios_fk`
      .getMany();

    if (result.length === 0) throw new NotFoundException("El usuario no tiene actividades asignadas");
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} actividade`;
  }

  async update(updateActividadeDto: UpdateActividadeDto) {
    const actividad = await this.actividadRepo.findOne({ where: { Id_actividad_pk: updateActividadeDto.Id } });
    if (!actividad) {
      throw new Error("Actividad no encontrada");
    }

    actividad.Nombre = updateActividadeDto.Nombre;
    actividad.Tipo = updateActividadeDto.Tipo;

    return await this.actividadRepo.save(actividad);

  }

  remove(id: number) {
    return `This action removes a #${id} actividade`;
  }





  async addAlumno(addAlumnoDto: AddAlumnoDto) {
    // Verificar que la actividad existe
    const actividad = await this.actividadRepo.findOne({
      where: { Id_actividad_pk: addAlumnoDto.id_actividad },
    });

    if (!actividad) {
      throw new HttpException('Actividad no encontrada', HttpStatus.NOT_FOUND);
    }

    // Verificar que el alumno existe
    const alumno = await this.alumnoRepo.findOne({
      where: { Id_alumno_pk: addAlumnoDto.id_alumno },
    });

    if (!alumno) {
      throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar si el alumno ya está inscrito en la actividad
    const pertenece = await this.perteneceRepo.findOne({
      where: {
        alumno: { Id_alumno_pk: addAlumnoDto.id_alumno },
        actividad: { Id_actividad_pk: addAlumnoDto.id_actividad },
      },
    });

    if (pertenece) {
      throw new HttpException(
        'El alumno ya está inscrito en esta actividad',
        HttpStatus.CONFLICT,
      );
    }

    // Guardar relación del alumno con la actividad
    return this.perteneceRepo.save({
      alumno: { Id_alumno_pk: addAlumnoDto.id_alumno }, // Relación con el alumno
      actividad, // Relación con la actividad
      Horas: 0,
      Activo: true,
    });
  }

  /**
   * Agregar un alumno a un evento relacionado con una actividad.
   */
  async addAlumnoEvento(addAlumnoEventoDto: AddAlumnoEventoDto) {
    // Verificar que el alumno está inscrito en alguna actividad
    const pertenece = await this.perteneceRepo.findOne({
      where: {
        alumno: { Id_alumno_pk: addAlumnoEventoDto.id_alumno },
      },
    });

    if (!pertenece) {
      throw new HttpException(
        'El alumno no está inscrito en ninguna actividad',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verificar que el evento existe
    const evento = await this.eventosRepo.findOne({
      where: { Id_evento_pk: addAlumnoEventoDto.id_evento },
    });

    if (!evento) {
      throw new HttpException('Evento no encontrado', HttpStatus.NOT_FOUND);
    }

    const participa = await this.participaRepo.findOne({
      where: {
        alumno: { Id_alumno_pk: addAlumnoEventoDto.id_alumno },
        evento: { Id_evento_pk: addAlumnoEventoDto.id_evento },
      },
    });

    if (participa) {
      throw new HttpException('El alumno ya participa en este evento', HttpStatus.CONFLICT);
    }

    // Guardar relación del alumno con el evento
    return this.participaRepo.save({
      alumno: { Id_alumno_pk: addAlumnoEventoDto.id_alumno }, // Relación con el alumno
      evento, // Relación con el evento
    });
  }
  
}
