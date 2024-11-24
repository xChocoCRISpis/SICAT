import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EncargadosService } from './encargados.service';
import { EncargadosController } from './encargados.controller';
import { Encargado } from 'src/entities/encargados.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from 'src/entities/horarios.entity';
import { EncargadoDetalle } from 'src/entities/encargados_detalle.entity';
import { Actividad } from 'src/entities/actividades.entity';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { Usuario } from 'src/entities/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Encargado, Horario, EncargadoDetalle, Actividad])],
  controllers: [EncargadosController],
  providers: [EncargadosService],
})
export class EncargadosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"encargados",method:RequestMethod.POST},
      {path:"encargados/horario",method:RequestMethod.POST},
      {path:"encargados",method:RequestMethod.PATCH},
      {path:"encargados/horario",method:RequestMethod.PUT},
    )
  }
}
