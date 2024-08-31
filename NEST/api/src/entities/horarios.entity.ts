import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EncargadoDetalle } from './encargados_detalle.entity';

@Entity('tb_horarios')
export class Horario {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_horario_pk: number;

  @Column({ type: 'varchar', length: 15 })
  Dia: string;

  @Column({ type: 'time' })
  Hora_inicio: string;

  @Column({ type: 'time' })
  Hora_fin: string;

  @OneToMany(() => EncargadoDetalle, detalle => detalle.horario)
  detalles: EncargadoDetalle[];
}
