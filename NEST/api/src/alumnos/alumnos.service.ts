import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Alumno } from "../entities/alumnos.entity";
import { Carrera } from "../entities/carreras.entity";
import { CreateAlumnoDto } from "./dtos/create-alumno.dto";
import { Usuario } from "src/entities/usuarios.entity";
import { Pertenece } from "src/entities/pertenece.entity";
import { Participa } from "src/entities/participa.entity";
import { Evento } from "src/entities/eventos.entity";
import { Actividad } from "src/entities/actividades.entity";

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumno) private readonly alumnoRepository: Repository<Alumno>,
    @InjectRepository(Carrera) private readonly carreraRepository: Repository<Carrera>,
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Pertenece) private readonly perteneceRepository: Repository<Pertenece>,
    @InjectRepository(Participa) private readonly participaRepository: Repository<Participa>,
    @InjectRepository(Evento) private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Actividad) private readonly actividadRepository: Repository<Actividad>
  ) {}

  async findAllFromActividad(
    idActividad: number,
    num_control?: string,
    nombre?: string,
    ap_paterno?: string,
    sexo?: string,
    semestre?: number,
    page: number = 1,
    limit: number = 50
  ) {
    // Validar parámetros de paginación
    page = Math.max(1, page);
    limit = Math.max(1, limit);
  
    // Construir consulta inicial
    const query = this.alumnoRepository
      .createQueryBuilder('alumno')
      .innerJoin('alumno.pertenencias', 'pertenece', 'pertenece.Activo = 1')
      .innerJoin('pertenece.actividad', 'actividad', 'actividad.Id_actividad_pk = :idActividad', { idActividad })
      .leftJoinAndSelect('alumno.carrera', 'carrera');
  
    // Aplicar filtros opcionales
    if (num_control) {
      query.andWhere('alumno.Num_control LIKE :num_control', { num_control: `%${num_control}%` });
    }
    if (nombre) {
      query.andWhere('alumno.Nombre LIKE :nombre', { nombre: `%${nombre}%` });
    }
    if (ap_paterno) {
      query.andWhere('alumno.Ap_paterno LIKE :ap_paterno', { ap_paterno: `%${ap_paterno}%` });
    }
    if (sexo) {
      query.andWhere('alumno.Sexo = :sexo', { sexo });
    }
    if (semestre) {
      query.andWhere('alumno.Semestre = :semestre', { semestre });
    }
  
    // Aplicar paginación
    query.skip((page - 1) * limit).take(limit);
  
    // Ejecutar consulta y obtener resultados
    const [alumnos, total] = await query.getManyAndCount();
  
    if (!alumnos || alumnos.length === 0) {
      throw new NotFoundException('No se encontraron alumnos asociados a esta actividad.');
    }
  
    // Formatear respuesta
    return {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      alumnos: alumnos.map(alumno => this.mapAlumnoWithDetails(alumno)),
    };
  }
  
  

  // Método privado para mapear la información del alumno
  private mapAlumnoWithDetails(alumno: Alumno) {
    return {
      id: alumno.Id_alumno_pk,
      num_control: alumno.Num_control,
      nombre: alumno.Nombre,
      ap_paterno: alumno.Ap_paterno,
      ap_materno: alumno.Ap_materno,
      sexo: alumno.Sexo,
      semestre: alumno.Semestre,
      carrera: alumno.carrera ? {
        nombre: alumno.carrera.Nombre,
        nombre_corto: alumno.carrera.Nombre_corto
      } : null,
    };
  }

  // Método privado para mapear la estructura del resultado
  private mapAlumnoWithCarrera(alumno: Alumno) {
    return {
      id_alumno: alumno.Id_alumno_pk,
      num_control: alumno.Num_control,
      nombre: alumno.Nombre,
      ap_paterno: alumno.Ap_paterno,
      ap_materno: alumno.Ap_materno,
      sexo: alumno.Sexo,
      semestre: alumno.Semestre,
      carrera: {
        nombre: alumno.carrera.Nombre,
        nombre_corto: alumno.carrera.Nombre_corto,
      },
    };
  }

  // Método para obtener un alumno por ID
  async findOne(num_control: string) {
    const alumno = await this.alumnoRepository.findOneBy({ Num_control: num_control });
    if (!alumno) throw new NotFoundException("No se encontró el alumno con el numero de control proporcionado");

    alumno.Foto = `${process.env.HOST_URL}alumnos/${alumno.Foto}`;
    console.log("Alumno por numero de control");
    return alumno;
  }

  // Método para obtener la información detallada de un alumno
  async getAlumnoDetail(id: number) {
    const alumno = await this.alumnoRepository
      .createQueryBuilder("alumno")
      .leftJoinAndSelect("alumno.pertenencias", "pertenencias")
      .leftJoinAndSelect("pertenencias.actividad", "actividad")
      .leftJoinAndSelect("alumno.participaciones", "participaciones")
      .leftJoinAndSelect("participaciones.evento", "evento")
      .leftJoinAndSelect("alumno.carrera", "carrera")
      .where("alumno.Id_alumno_pk = :id", { id })
      .getOne();

    if (!alumno) {
      throw new NotFoundException(`No se encontró el alumno con el id ${id}`);
    }

    return this.mapAlumnoDetail(alumno);
  }

  // Método privado para mapear el resultado con la estructura deseada
  private mapAlumnoDetail(alumno: Alumno) {
    if (!alumno.Foto) alumno.Foto = "alumno_default.jpg";
    return {
      num_control: alumno.Num_control,
      nombre: alumno.Nombre,
      ap_paterno: alumno.Ap_paterno,
      ap_materno: alumno.Ap_materno,
      sexo: alumno.Sexo,
      fecha_nac: alumno.Fecha_nac,
      semestre: alumno.Semestre,
      nivel: alumno.Nivel,
      foto: `${process.env.HOST_URL}/alumnos/${alumno.Foto}`,
      telefono: alumno.Telefono,
      correo: alumno.Correo,
      carrera: {
        nombre: alumno.carrera.Nombre,
        clave: alumno.carrera.Clave,
        nombre_corto: alumno.carrera.Nombre_corto,
      },
      actividades: alumno.pertenencias.map(pertenece => ({
        nombre: pertenece.actividad.Nombre,
        tipo: pertenece.actividad.Tipo,
        horas: pertenece.Horas,
        activo: pertenece.Activo,
      })),
      eventos: alumno.participaciones.map(participa => ({
        nombre: participa.evento.Nombre,
        fecha: participa.evento.Fecha,
      })),
    };
  }

  // Método para crear un nuevo alumno y guardar la imagen
  async createAlumno(createAlumnoDto: CreateAlumnoDto, imagen: Express.Multer.File) {
    // Cargar la carrera asociada usando el ID del DTO

    //Cuando se usa el array en el where con un mismo objeto se comporta como un AND
    //En objetos distintos los trata como un OR
    const existAlumno = await this.alumnoRepository.findOne({
      where: [{ Num_control: createAlumnoDto.Num_control }, { Correo: createAlumnoDto.Correo }],
    });

    if (existAlumno) throw new BadRequestException(`Ya existe este numero de control y/o email`);

    const carrera = await this.carreraRepository.findOneBy({ Id_carrera_pk: createAlumnoDto.carrera });

    if (!carrera) {
      throw new BadRequestException(`Carrera con ID ${createAlumnoDto.carrera} no encontrada`);
    }

    // Crear una nueva instancia de Alumno con los datos del DTO
    const newAlumno = this.alumnoRepository.create({
      ...createAlumnoDto,
      carrera, // Asignar la entidad Carrera en lugar del ID
      Foto: imagen?.filename, // Guardar el nombre de la imagen
    });

    // Guardar la nueva entidad en la base de datos
    const savedAlumno = await this.alumnoRepository.save(newAlumno);

    // Devolver el alumno guardado
    return { message: "Alumno creado correctamente", success: true, alumno: savedAlumno };
  }

  // Método para actualizar un alumno
  /* async update(id: number, alumno: Partial<Alumno>): Promise<Alumno> {
    await this.alumnosRepository.update(id, alumno);
    return this.findOne(id);
  } */

  // Método para eliminar un alumno
  async remove(id: number): Promise<void> {
    await this.alumnoRepository.delete(id);
  }

  async findAllWithCarreras(
    num_control?: string,
    nombre?: string,
    ap_paterno?: string,
    sexo?: string,
    semestre?: number,
    nombre_corto?: string,
    page: number = 1, // Página actual, por defecto 1
    limit: number = 50 // Número de resultados por página, por defecto 10
  ) {
    const query = this.alumnoRepository.createQueryBuilder("alumno").leftJoinAndSelect("alumno.carrera", "carrera");

    // Aplicar los filtros opcionales
    if (num_control) {
      query.andWhere("alumno.Num_control = :num_control", { num_control });
    }
    if (nombre) {
      query.andWhere("alumno.Nombre LIKE :nombre", { nombre: `%${nombre}%` });
    }
    if (ap_paterno) {
      query.andWhere("alumno.Ap_paterno LIKE :ap_paterno", { ap_paterno: `%${ap_paterno}%` });
    }
    if (sexo) {
      query.andWhere("alumno.Sexo = :sexo", { sexo });
    }
    if (semestre) {
      query.andWhere("alumno.Semestre = :semestre", { semestre });
    }
    if (nombre_corto) {
      query.andWhere("carrera.Nombre_corto LIKE :nombre_corto", { nombre_corto: `%${nombre_corto}%` });
    }

    // Aplicar paginación
    query.skip((page - 1) * limit).take(limit);

    const [alumnos, total] = await query.getManyAndCount(); // Obtener resultados y el total

    if (!alumnos || alumnos.length === 0) {
      throw new NotFoundException("No se encontraron alumnos");
    }

    // Retornar la información paginada
    return {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      alumnos: alumnos.map(alumno => this.mapAlumnoWithCarrera(alumno)),
    };
  }

  async findAllFilterByEncargado(
    usuarioId: number, // ID del encargado actual
    actividadId?: number, // ID de la actividad (opcional, puede ser dinámico)
    num_control?: string,
    nombre?: string,
    ap_paterno?: string,
    sexo?: string,
    semestre?: number,
    nombre_corto?: string,
    page: number = 1, // Página actual, por defecto 1
    limit: number = 50 // Número de resultados por página, por defecto 50
  ) {
    console.log(usuarioId, actividadId, num_control, nombre, ap_paterno, sexo, semestre, nombre_corto, page, limit);
    const query = this.alumnoRepository
      .createQueryBuilder("alumno")
      .leftJoinAndSelect("alumno.carrera", "carrera") // Relación con carrera
      .innerJoin("alumno.pertenencias", "pertenencia", "pertenencia.Activo = 1") // Solo alumnos activos
      .innerJoin("pertenencia.actividad", "actividad") // Relación con actividad
      .innerJoin("actividad.detalles", "detalle") // Relación con detalles (EncargadoDetalle)
      .innerJoin("detalle.encargado", "encargado") // Relación con encargado
      .innerJoin("encargado.usuario", "usuario", "usuario.Id_usuario_pk = :usuarioId", { usuarioId }); // Relación con usuario

      console.log(query.getSql());
      // Si se proporciona actividadId, filtrar por ella
    if (actividadId) {
      query.andWhere("actividad.Id_actividad_pk = :actividadId", { actividadId });
    }

    console.log(`where actividad=${actividadId}\ln`, query[0]);

    // Aplicar los filtros opcionales
    if (num_control) {
      query.andWhere("alumno.Num_control = :num_control", { num_control });
    }
    if (nombre) {
      query.andWhere("alumno.Nombre LIKE :nombre", { nombre: `%${nombre}%` });
    }
    if (ap_paterno) {
      query.andWhere("alumno.Ap_paterno LIKE :ap_paterno", { ap_paterno: `%${ap_paterno}%` });
    }
    if (sexo) {
      query.andWhere("alumno.Sexo = :sexo", { sexo });
    }
    if (semestre) {
      query.andWhere("alumno.Semestre = :semestre", { semestre });
    }
    if (nombre_corto) {
      query.andWhere("carrera.Nombre_corto LIKE :nombre_corto", { nombre_corto: `%${nombre_corto}%` });
    }

    // Aplicar paginación
    query.skip((page - 1) * limit).take(limit);

    // Ejecutar la consulta
    const [alumnos, total] = await query.getManyAndCount();

    if (!alumnos || alumnos.length === 0) {
      throw new NotFoundException("No se encontraron alumnos");
    }

    // Retornar la información paginada
    return {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      alumnos: alumnos.map(alumno => this.mapAlumnoWithCarrera(alumno)),
    };
  }

  async findAlumnoActividad(idAlumno: number, idActividad: number) {
    if (!idAlumno || !idActividad) {
      throw new BadRequestException('El ID del alumno y el ID de la actividad son obligatorios.');
    }
  
    const query = this.alumnoRepository
      .createQueryBuilder('alumno')
      .leftJoinAndSelect('alumno.carrera', 'carrera')
      .leftJoinAndSelect('alumno.pertenencias', 'pertenece', 'pertenece.Activo = 1')
      .leftJoinAndSelect('pertenece.actividad', 'actividad', 'actividad.Id_actividad_pk = :idActividad', { idActividad })
      .where('alumno.Id_alumno_pk = :idAlumno', { idAlumno });
  
    // Ejecutar la consulta
    const alumno = await query.getOne();
  
    // Verificar resultados
    if (!alumno || !alumno.pertenencias || alumno.pertenencias.length === 0) {
      throw new NotFoundException('No se encontró el alumno en esta actividad.');
    }
  
    // Mapear la actividad específica
    const actividad = alumno.pertenencias.find(
      (pertenencia) => pertenencia.actividad?.Id_actividad_pk === idActividad,
    );
  
    if (!actividad) {
      throw new NotFoundException('La actividad asociada no fue encontrada.');
    }
  
    return {
      alumno: {
        id: alumno.Id_alumno_pk,
        num_control: alumno.Num_control,
        nombre: alumno.Nombre,
        ap_paterno: alumno.Ap_paterno,
        ap_materno: alumno.Ap_materno,
        sexo: alumno.Sexo,
        semestre: alumno.Semestre,
        carrera: alumno.carrera
          ? {
              nombre: alumno.carrera.Nombre,
              nombre_corto: alumno.carrera.Nombre_corto,
            }
          : null,
      },
      actividad: {
        id: actividad.actividad.Id_actividad_pk,
        nombre: actividad.actividad.Nombre,
        horas: actividad.Horas,
        activo: actividad.Activo,
      },
    };
  }
  
  
}
