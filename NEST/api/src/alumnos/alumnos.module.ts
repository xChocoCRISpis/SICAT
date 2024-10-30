import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Alumno}  from '../entities/alumnos.entity';
import {Carrera}  from '../entities/carreras.entity';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { Usuario } from 'src/entities/usuarios.entity';
import { Pertenece } from 'src/entities/pertenece.entity';
import { Participa } from 'src/entities/participa.entity';
import { Evento } from 'src/entities/eventos.entity';
import { Actividad } from 'src/entities/actividades.entity';
import { ImgBBService } from 'src/services/imgbb/imgbb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno,Carrera,Usuario,Pertenece,Participa,Evento,Carrera,Actividad])],
  controllers: [AlumnosController],
  providers: [AlumnosService,ImgBBService],
  exports:[AlumnosService]
})
export class AlumnosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"alumnos",method:RequestMethod.GET},
      {path:"alumnos/buscar",method:RequestMethod.GET},
    )
  }
}
