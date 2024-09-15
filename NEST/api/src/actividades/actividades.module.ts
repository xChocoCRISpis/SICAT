import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { Encargado } from 'src/entities/encargados.entity';
import { EncargadoDetalle } from 'src/entities/encargados_detalle.entity';
import {Actividad} from 'src/entities/actividades.entity'
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario,Encargado,EncargadoDetalle,Actividad])
  ],
  controllers: [ActividadesController],
  providers: [ActividadesService],
})
export class ActividadesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"actividades",method:RequestMethod.GET},
    )
  }
}
