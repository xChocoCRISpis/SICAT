import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEncargadoDto } from './dto/create-encargado.dto';
import { UpdateEncargadoDto } from './dto/update-encargado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Encargado } from 'src/entities/encargados.entity';
import { Repository } from 'typeorm';
import { Horario } from 'src/entities/horarios.entity';
import { EncargadoDetalle } from 'src/entities/encargados_detalle.entity';
import { Actividad } from 'src/entities/actividades.entity';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Usuario } from 'src/entities/usuarios.entity';

@Injectable()
export class EncargadosService {

  constructor(
    @InjectRepository(Encargado)
    private encargadoRepository: Repository<Encargado>,
    @InjectRepository(Horario)
    private horarioRepository: Repository<Horario>,
    @InjectRepository(EncargadoDetalle)
    private encargadoDetalleRepository: Repository<EncargadoDetalle>,
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createEncargadoDto: CreateEncargadoDto) {
    // Verificar si el encargado ya existe
    const encargadoExistente = await this.encargadoRepository.findOne({
      where: {
        Nombre: createEncargadoDto.Nombre,
        Ap_paterno: createEncargadoDto.Ap_paterno,
        Ap_materno: createEncargadoDto.Ap_materno,
      },
    });
  
    if (encargadoExistente) {
      throw new HttpException('El encargado ya existe', HttpStatus.CONFLICT);
    }

    const userIsInUse = await this.encargadoRepository.findOne({
      where: { usuario: { Id_usuario_pk: createEncargadoDto.Id_usuarios_fk } },
    });

    if(userIsInUse) {
      throw new HttpException('El usuario ya está en uso', HttpStatus.CONFLICT);
    }
  
    // Verificar si el usuario existe
    const usuario = await this.usuarioRepository.findOne({
      where: { Id_usuario_pk: createEncargadoDto.Id_usuarios_fk },
    });
  
    if (!usuario) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
  
    // Crear el encargado y vincular el usuario
    const newEncargado = this.encargadoRepository.create({
      ...createEncargadoDto,
      usuario, // Vincular el objeto de usuario
    });
      delete newEncargado.usuario.Contrasena;
      delete newEncargado.usuario.Token;
      delete newEncargado.usuario.Code_change_password;
    try {
      return await this.encargadoRepository.save(newEncargado);
    } catch (error) {
      throw new HttpException(
        'Error al guardar el encargado en la base de datos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async createHorario(createHorarioDto: CreateHorarioDto) {
    // Verificar si el horario ya existe
    let horario = await this.horarioRepository.findOne({
      where: {
        Dia: createHorarioDto.Dia,
        Hora_inicio: createHorarioDto.Hora_inicio,
        Hora_fin: createHorarioDto.Hora_fin,
      },
    });
  
    // Si no existe, crearlo
    if (!horario) {
      horario = await this.horarioRepository.create({
        Dia: createHorarioDto.Dia,
        Hora_inicio: createHorarioDto.Hora_inicio,
        Hora_fin: createHorarioDto.Hora_fin,
      });
  
      try {
        await this.horarioRepository.save(horario);
      } catch (error) {
        throw new HttpException(
          'Error al guardar el horario en la base de datos',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    // Verificar si el encargado y la actividad existen
    const encargado = await this.encargadoRepository.findOne({
      where: { Id_encargado_pk: createHorarioDto.Id_encargado_fk },
    });
  
    if (!encargado) {
      throw new HttpException('El encargado no existe', HttpStatus.NOT_FOUND);
    }
  
    const actividad = await this.actividadRepository.findOne({
      where: { Id_actividad_pk: createHorarioDto.Id_actividad_fk },
    });
  
    if (!actividad) {
      throw new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
    }
  
    // Crear el registro en encargado_detalle
    const encargadoDetalle = this.encargadoDetalleRepository.create({
      Id_encargado_fk: createHorarioDto.Id_encargado_fk,
      Id_horario_fk: horario.Id_horario_pk,
      Id_actividad_fk: createHorarioDto.Id_actividad_fk,
    });
  
    try {
      await this.encargadoDetalleRepository.save(encargadoDetalle);
      return { message: 'Horario y asignación creados exitosamente' };
    } catch (error) {
      throw new HttpException(
        'Error al registrar el horario en encargado_detalle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async getAllEncargados() {
    const encargados = await this.encargadoRepository
    .createQueryBuilder('encargado')
    .leftJoinAndSelect('encargado.usuario', 'usuario') // Relación con usuario
    .leftJoinAndSelect('encargado.detalles', 'detalle') // Relación con detalles
    .leftJoinAndSelect('detalle.horario', 'horario') // Relación con horario
    .leftJoinAndSelect('detalle.actividad', 'actividad') // Relación con actividad
    .select([
      'encargado.Id_encargado_pk',
      'encargado.Nombre',
      'encargado.Ap_paterno',
      'encargado.Ap_materno',
      'usuario.Id_usuario_pk',
      'usuario.Nombre',
      'usuario.Correo',
      'detalle.Id_horario_fk',
      'detalle.Id_actividad_fk',
      'horario.Id_horario_pk',
      'horario.Dia',
      'horario.Hora_inicio',
      'horario.Hora_fin',
      'actividad.Id_actividad_pk',
      'actividad.Nombre',
      'actividad.Tipo',
    ])
    .getMany();


    if(!encargados) {
      throw new HttpException('No hay encargados', HttpStatus.NOT_FOUND);
    }

    return encargados;
  }

  async updateEncargado(updateEncargadoDto: UpdateEncargadoDto, Id_encargado: number) {
    // Verificar que hay datos para actualizar
    if (!updateEncargadoDto || Object.keys(updateEncargadoDto).length === 0) {
      throw new HttpException(
        'No se proporcionaron valores para actualizar al encargado',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const result = await this.encargadoRepository.update(Id_encargado, updateEncargadoDto);
  
    if (result.affected === 0) {
      throw new HttpException('Encargado no encontrado', HttpStatus.NOT_FOUND);
    }
  
    return { message: 'Encargado actualizado exitosamente' };
  }
  
  async updateHorario(updateHorarioDto: UpdateHorarioDto, Id_horario: number) {
    // Verificar que hay datos para actualizar
    if (!updateHorarioDto || Object.keys(updateHorarioDto).length === 0) {
      throw new HttpException(
        'No se proporcionaron valores para actualizar el horario',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const result = await this.horarioRepository.update(Id_horario, updateHorarioDto);
  
    if (result.affected === 0) {
      throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
    }
  
    return { message: 'Horario actualizado exitosamente' };
  }



  async deleteHorario(id: number) {
    // Verificar si el horario existe
    const horario = await this.horarioRepository.findOne({ where: { Id_horario_pk: id } });
    if (!horario) {
      throw new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
    }

    try {
      // Eliminar el horario
      await this.horarioRepository.delete(id);
      return { message: 'Horario eliminado exitosamente' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al eliminar el horario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteHorariosByActividadAndEncargado(idActividad: number, idEncargado: number) {
    if (!idActividad || !idEncargado) {
      throw new HttpException('Los parámetros actividad y encargado son obligatorios', HttpStatus.BAD_REQUEST);
    }

    // Verificar si existen detalles con la actividad y el encargado dados
    const detalles = await this.encargadoDetalleRepository.find({
      where: {
        Id_actividad_fk: idActividad,
        Id_encargado_fk: idEncargado,
      },
    });

    if (detalles.length === 0) {
      throw new HttpException(
        'No se encontraron horarios asociados a esta actividad y encargado',
        HttpStatus.NOT_FOUND,
      );
    }

    // Obtener los IDs de los horarios relacionados
    const horarioIds = detalles.map(detalle => detalle.Id_horario_fk);

    try {
      // Eliminar los registros en `encargados_detalle` relacionados
      await this.encargadoDetalleRepository.delete({
        Id_actividad_fk: idActividad,
        Id_encargado_fk: idEncargado,
      });

      // Eliminar los horarios en la tabla `horarios`
      await this.horarioRepository.delete(horarioIds);

      return {
        message: `Horarios eliminados para la actividad con ID ${idActividad} y el encargado con ID ${idEncargado}`,
      };
    } catch (error) {
      throw new HttpException(
        'Error al eliminar los horarios relacionados con la actividad y encargado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async availableUsers() {
    const users = await this.usuarioRepository
      .createQueryBuilder('u') // Alias para la tabla `usuarios`
      .leftJoinAndSelect('u.encargados', 'e') // LEFT JOIN con la tabla `encargados`
      .where('e.Id_usuarios_fk IS NULL') // Filtro para usuarios no asociados
      .select(['u.Id_usuario_pk as Id_usuario', 'u.Nombre as Nombre', 'u.Correo as Correo']) // Selección de campos específicos
      .getRawMany(); // Devuelve los resultados como objetos planos (raw)
  
    return users;
  }
  
  
}
