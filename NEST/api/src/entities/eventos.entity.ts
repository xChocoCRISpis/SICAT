import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Participa } from './participa.entity';
import { Actividad } from './actividades.entity';

@Entity('tb_eventos')
export class Evento {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_evento_pk: number;

  @Column({ type: 'varchar', length: 300 })
  Nombre: string;

  @Column({ type: 'varchar', length: 300 })
  Lugar: string;

  @Column({ type: 'date' })
  Fecha: string;

  @Column({ type: 'time' })
  Hora: string;

  @OneToMany(() => Participa, participa => participa.evento)
  participaciones: Participa[];

  @ManyToOne(() => Actividad, actividad => actividad.eventos)
  @JoinColumn({ name: 'Id_Actividad_fk' })
  actividad: Actividad;
}
