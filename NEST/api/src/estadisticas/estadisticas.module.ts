import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { Participa } from 'src/entities/participa.entity';
import { Alumno } from 'src/entities/alumnos.entity';
import { Evento } from 'src/entities/eventos.entity';
import { Carrera } from 'src/entities/carreras.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from 'src/entities/actividades.entity';
import { Pertenece } from 'src/entities/pertenece.entity';
import { AuthMiddleware } from 'src/middlewares/auth/auth.middleware';
import { Usuario } from 'src/entities/usuarios.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Carrera, Alumno, Participa, Evento, Actividad,Pertenece,Usuario])],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"estadisticas/*",method:RequestMethod.GET},
    )
  }
}
