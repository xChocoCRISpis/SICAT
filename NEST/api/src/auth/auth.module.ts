import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { BitacoraSchemaModule } from 'src/schemas/bitacora/bitacora-schema.module';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { ImgBBService } from 'src/services/imgbb/imgbb.service';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario]),
  BitacoraSchemaModule,
  MailModule],
  controllers: [AuthController],
  providers: [AuthService,ImgBBService],
  exports:[AuthService]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"auth/createUser",method:RequestMethod.POST},
      {path:"auth/user-type",method:RequestMethod.GET}
    )
  }
}
