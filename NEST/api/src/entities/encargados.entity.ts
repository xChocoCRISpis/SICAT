import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { EncargadoDetalle } from './encargados_detalle.entity';

@Entity('tb_encargados')
export class Encargado {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_encargado_pk: number;

  @Column({ type: 'varchar', length: 150 })
  Nombre: string;

  @Column({ type: 'varchar', length: 150 })
  Ap_paterno: string;

  @Column({ type: 'varchar', length: 150 })
  Ap_materno: string;

  @ManyToOne(() => Usuario, usuario => usuario.encargados)
  usuario: Usuario;

  @OneToMany(() => EncargadoDetalle, detalle => detalle.encargado)
  detalles: EncargadoDetalle[];
}
