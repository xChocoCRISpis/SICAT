import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChecadorService } from './checador.service';
import { ChecadorController } from './checador.controller';
import { ChecadorSchemaModule } from 'src/schemas/checador/checador-schema.module';
import { Usuario } from 'src/entities/usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  imports:[ChecadorSchemaModule,
    TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [ChecadorController],
  providers: [ChecadorService],
  
})
export class ChecadorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"checador",method:RequestMethod.GET},
    )
  }
}
