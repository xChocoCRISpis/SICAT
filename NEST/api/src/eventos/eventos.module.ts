import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from 'src/entities/actividades.entity';
import { Evento } from 'src/entities/eventos.entity';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { Usuario } from 'src/entities/usuarios.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Actividad,Evento,Usuario]),
  ],
  controllers: [EventosController],
  providers: [EventosService],
})
export class EventosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"eventos",method:RequestMethod.POST},
      {path:"eventos",method:RequestMethod.GET},
      {path:"eventos/:id",method:RequestMethod.GET},
    )
  }
}
