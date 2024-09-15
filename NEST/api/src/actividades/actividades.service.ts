import { Injectable } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { Encargado } from 'src/entities/encargados.entity';
import { EncargadoDetalle } from 'src/entities/encargados_detalle.entity';
import { Actividad } from 'src/entities/actividades.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo:Repository<Usuario>,
    @InjectRepository(Encargado)
    private readonly encargadoRepo:Repository<Encargado>,
    @InjectRepository(EncargadoDetalle)
    private readonly encargadoDetalleRepo:Repository<EncargadoDetalle>,
    @InjectRepository(Actividad)
    private readonly actividadRepo:Repository<Actividad>
  ){

  }
  create(createActividadeDto: CreateActividadeDto) {
    return 'This action adds a new actividade';
  }

  findAll() {
    
  }

  findOne(id: number) {
    return `This action returns a #${id} actividade`;
  }

  update(id: number, updateActividadeDto: UpdateActividadeDto) {
    return `This action updates a #${id} actividade`;
  }

  remove(id: number) {
    return `This action removes a #${id} actividade`;
  }
}
