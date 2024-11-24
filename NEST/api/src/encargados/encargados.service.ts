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
    private encargadoActividadRepository: Repository<Actividad>,
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
    const horario = await this.horarioRepository.findOne({where: {Dia: createHorarioDto.Dia, Hora_inicio: createHorarioDto.Hora_inicio, Hora_fin: createHorarioDto.Hora_fin}})
    if(horario) {
      throw new HttpException('El horario ya existe',500);
    }

    const newHorario = await this.horarioRepository.create(createHorarioDto);
    if(!newHorario) {
      throw new HttpException('Error al crear el horario', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.horarioRepository.save(newHorario);
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
  
}
