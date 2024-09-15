import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(Id_usuario:number):Promise<any> {
    const result = await this.actividadRepo
      .createQueryBuilder('a') // Alias para la tabla `tb_actividades`
      .select(['a.Id_actividad_pk', 'a.Nombre', 'a.Tipo'])
      .innerJoin('a.detalles', 'ed') // Relación entre `tb_actividades` y `tb_encargados_detalle`
      .innerJoin('ed.encargado', 'e') // Relación entre `tb_encargados_detalle` y `tb_encargados`
      .where('e.id_usuarios_fk = :Id_usuario', { Id_usuario }) // Condición para `id_usuarios_fk`
      .getMany();
    
    if(result.length === 0) throw new NotFoundException('El usuario no tiene actividades asignadas');
    return result;

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
