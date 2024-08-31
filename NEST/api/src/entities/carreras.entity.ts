import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Alumno } from './alumnos.entity';

@Entity('tb_carreras')
export class Carrera {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_carrera_pk: number;

  @Column({ type: 'varchar', length: 300 })
  Nombre: string;

  @Column({ type: 'char', length: 20 })
  Clave: string;

  @Column({ type: 'char', length: 10 })
  Nombre_corto: string;

  @OneToMany(() => Alumno, alumno => alumno.carrera)
  alumnos: Alumno[];
}

