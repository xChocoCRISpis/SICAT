import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Encargado } from './encargados.entity';
import { Horario } from './horarios.entity';
import { Actividad } from './actividades.entity';

@Entity('tb_encargados_detalle')
export class EncargadoDetalle {
  @PrimaryColumn({ name: 'Id_encargado_fk', type: 'int', unsigned: true })
  Id_encargado_fk: number;

  @PrimaryColumn({ name: 'Id_horario_fk', type: 'int', unsigned: true })
  Id_horario_fk: number;

  @PrimaryColumn({ name: 'Id_actividad_fk', type: 'int', unsigned: true })
  Id_actividad_fk: number;

  @ManyToOne(() => Encargado, encargado => encargado.detalles)
  @JoinColumn({ name: 'Id_encargado_fk' })
  encargado: Encargado;

  @ManyToOne(() => Horario, horario => horario.detalles)
  @JoinColumn({ name: 'Id_horario_fk' })
  horario: Horario;

  @ManyToOne(() => Actividad, actividad => actividad.detalles)
  @JoinColumn({ name: 'Id_actividad_fk' })
  actividad: Actividad;
}
