import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Actividad } from './actividades.entity';
import { Alumno } from './alumnos.entity';

@Entity('tb_pertenece')
export class Pertenece {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_pertenece_pk: number;

  @Column({ type: 'int' })
  Horas: number;

  @Column({ type: 'tinyint', default: 1 })
  Activo: boolean;

  @ManyToOne(() => Actividad, actividad => actividad.pertenencias)
  @JoinColumn({ name: 'Id_actividad_fk' })
  actividad: Actividad;

  @ManyToOne(() => Alumno, alumno => alumno.pertenencias)
  @JoinColumn({ name: 'Id_alumnos_fk' })
  alumno: Alumno;
}
