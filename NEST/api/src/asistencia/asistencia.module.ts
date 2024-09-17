import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { AsistenciaSchemaModule } from 'src/schemas/asistencia/asistencia-schema.module';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';

@Module({
  imports:[AsistenciaSchemaModule,
    TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"asistencia",method:RequestMethod.GET},
    )
  }
}
