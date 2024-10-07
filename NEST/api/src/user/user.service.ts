import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encargado } from 'src/entities/encargados.entity';
import { EncargadoDetalle } from 'src/entities/encargados_detalle.entity';
import { Horario } from 'src/entities/horarios.entity';
import { Actividad } from 'src/entities/actividades.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Encargado) private readonly encargadoRepo:Repository<Encargado>,
    @InjectRepository(EncargadoDetalle) private readonly encargadoDetalleRepo:Repository<EncargadoDetalle>,
    @InjectRepository(Horario) private readonly horarioRepo:Repository<Horario>,
    @InjectRepository(Actividad) private readonly actividadRepo:Repository<Actividad> 
  ){
    
  }

  async profile(id_usuario: number, year?: string, semestre?: string): Promise<any> {
    // Validar si el ID de usuario es válido
    if (!id_usuario) {
      throw new BadRequestException('ID de usuario no proporcionado.');
    }

    // Buscar el encargado por ID de usuario
    const encargado = await this.encargadoRepo
    .createQueryBuilder('e')
    .select([
      'e.Nombre as nombre',
      'e.Ap_paterno as ap_paterno',
      'e.Ap_materno as ap_materno',
      'e.Id_encargado_pk as id_encargado_pk'
    ])
    .where('e.Id_usuarios_fk = :id_usuario', { id_usuario })
    .getRawOne();

    console.log(encargado)

    // Si no se encuentra el encargado, lanzar excepción
    if (!encargado) {
      throw new NotFoundException(`Encargado no encontrado para el usuario con ID ${id_usuario}.`);
    }

    const { id_encargado_pk: id_encargado } = encargado;

    // Obtener los horarios filtrados
    const horario = await this.horarios(id_encargado, year, semestre);

    // Si no se encuentran horarios, lanzar excepción
    if (horario.length === 0) {
      throw new NotFoundException(`No se encontraron horarios para el encargado con ID ${id_encargado}.`);
    }

    const usuario = { encargado: { ...encargado }, horarios: horario };
    return usuario;
  }

  // Método para obtener horarios con manejo de excepciones
  async horarios(id_encargado: number, ano?: string, semestre?: string): Promise<any> {
    // Validar si el ID de encargado es válido
    if (!id_encargado) {
      throw new BadRequestException('ID de encargado no proporcionado.');
    }

    let horario = await this.encargadoDetalleRepo
      .createQueryBuilder('ed')
      .select([
        'h.Id_horario_pk as id_horario',
        'h.Dia as dia',
        'h.Hora_inicio as hora_inicio',
        'h.Hora_fin as hora_fin',
        'a.Id_actividad_pk as id_actividad',
        'a.Nombre as nombre',
        'a.Tipo as tipo',
      ])
      .innerJoin('ed.horario', 'h')
      .innerJoin('ed.actividad', 'a')
      .where('ed.id_encargado_fk = :id_encargado', { id_encargado })
      .getRawMany();

    // Modificar los resultados para extraer el día de la semana, año y semestre
    horario = horario.map(item => {
      const [dia_semana, ano, semestre] = item.dia.split('-');
      let semestreName = '';

      // Determinar el nombre del semestre
      if (semestre === 'AD') {
        semestreName = 'Agosto-Diciembre';
      } else if (semestre === 'EJ') {
        semestreName = 'Enero-Junio';
      }

      delete item.dia;
      return {
        ...item,
        dia_semana,
        ano,
        semestre: semestreName,
      };
    });

    // Filtrar los resultados según el año y/o semestre proporcionado
    if (ano) {
      horario = horario.filter(item => item.ano === ano);
    }

    if (semestre) {
      const semestreName =
        semestre === 'AD' ? 'Agosto-Diciembre' : semestre === 'EJ' ? 'Enero-Junio' : '';
      horario = horario.filter(item => item.semestre === semestreName);
    }

    return horario;
  }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
