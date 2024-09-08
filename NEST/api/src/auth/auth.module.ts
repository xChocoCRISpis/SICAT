import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { BitacoraSchemaModule } from 'src/schemas/bitacora/bitacora-schema.module';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario]),
  BitacoraSchemaModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"auth/createUser",method:RequestMethod.POST},
    )
  }
}
