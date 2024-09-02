import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Encargado } from './encargados.entity';

@Entity('tb_usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_usuario_pk: number;

  @Column({ type: 'varchar', length: 50 })
  Nombre: string;

  @Column({ type: 'varchar', length: 50 })
  Contrasena: string;

  @Column({ type: 'int' })
  Tipo: number;

  @Column({type:'text'})
  Cadena_qr:string;

  @Column({type:'text'})
  Imagen_qr:string;

  @Column({type:'varchar',length:150})
  Correo:string;

  @OneToMany(() => Encargado, encargado => encargado.usuario)
  encargados: Encargado[];
}


