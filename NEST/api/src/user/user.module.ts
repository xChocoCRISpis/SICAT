import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encargado } from 'src/entities/encargados.entity';
import { EncargadoDetalle } from 'src/entities/encargados_detalle.entity';
import { Horario } from 'src/entities/horarios.entity';
import { Actividad } from 'src/entities/actividades.entity';
import { Usuario } from 'src/entities/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario,Encargado,EncargadoDetalle,Horario,Actividad])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"user/profile",method:RequestMethod.GET},
    )
  }
}
