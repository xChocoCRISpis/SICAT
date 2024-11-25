import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { Encargado } from 'src/entities/encargados.entity';
import { EncargadoDetalle } from 'src/entities/encargados_detalle.entity';
import {Actividad} from 'src/entities/actividades.entity'
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { Alumno } from 'src/entities/alumnos.entity';
import { Participa } from 'src/entities/participa.entity';
import { Evento } from 'src/entities/eventos.entity';
import { Pertenece } from 'src/entities/pertenece.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario,Encargado,EncargadoDetalle,Actividad, Alumno, Participa, Evento, Pertenece])
  ],
  controllers: [ActividadesController],
  providers: [ActividadesService],
})
export class ActividadesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"actividades",method:RequestMethod.GET},
      {path:"actividades/alumno",method:RequestMethod.POST},
      {path:"actividades/alumno/evento",method:RequestMethod.POST}
    )
  }
}
