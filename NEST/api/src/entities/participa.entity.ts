import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Alumno } from './alumnos.entity';
import { Evento } from './eventos.entity';

@Entity('tb_participa')
export class Participa {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  Id_participa_pk: number;

  @ManyToOne(() => Alumno, alumno => alumno.participaciones)
  @JoinColumn({ name: 'Id_alumno_fk' })
  alumno: Alumno;

  @ManyToOne(() => Evento, evento => evento.participaciones)
  @JoinColumn({ name: 'Id_evento_fk' })
  evento: Evento;
}
