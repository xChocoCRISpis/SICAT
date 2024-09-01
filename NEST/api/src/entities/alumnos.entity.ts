import { Entity,JoinColumn, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Carrera } from './carreras.entity';
import { Participa } from './participa.entity';
import { Pertenece } from './pertenece.entity';

@Entity('tb_alumnos')
export class Alumno {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_alumno_pk: number;

  @Column({ type: 'char', length: 10 })
  Num_control: string;

  @Column({ type: 'varchar', length: 150 })
  Nombre: string;

  @Column({ type: 'varchar', length: 150 })
  Ap_paterno: string;

  @Column({ type: 'varchar', length: 150 })
  Ap_materno: string;

  @Column({ type: 'char', length: 1 })
  Sexo: string;

  @Column({ type: 'date' })
  Fecha_nac: string;

  @Column({ type: 'int' })
  Semestre: number;

  @Column({ type: 'int' })
  Nivel: number;

  @Column({ type: 'text', nullable: true })
  Foto: string;

  @Column({ type: 'char', length: 12 })
  Telefono: string;

  @Column({ type: 'varchar', length: 100 })
  Correo: string;

  @ManyToOne(() => Carrera, carrera => carrera.alumnos)
  @JoinColumn({name:'Id_carreras_fk'})
  carrera: Carrera;

  @OneToMany(() => Participa, participa => participa.alumno)
  participaciones: Participa[];

  @OneToMany(() => Pertenece, pertenece => pertenece.alumno)
  pertenencias: Pertenece[];
}


