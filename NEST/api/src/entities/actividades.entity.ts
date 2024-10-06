import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pertenece } from './pertenece.entity';
import { EncargadoDetalle } from './encargados_detalle.entity';

@Entity('tb_actividades')
export class Actividad {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_actividad_pk: number;

  @Column({ type: 'varchar', length: 200 })
  Nombre: string;

  @Column({ type: 'char', length: 3 })
  Tipo: string;

  @OneToMany(() => Pertenece, pertenece => pertenece.actividad)
  pertenencias: Pertenece[];

  @OneToMany(() => EncargadoDetalle, detalle => detalle.actividad)
  detalles: EncargadoDetalle[];
}

