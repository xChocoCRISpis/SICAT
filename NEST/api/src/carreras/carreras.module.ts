import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Carrera } from "../entities/carreras.entity";
import { AuthMiddleware } from "src/middlewares/auth/auth.middleware";
import { Usuario } from "src/entities/usuarios.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Carrera, Usuario])],
  controllers: [CarrerasController],
  providers: [CarrerasService],
})
export class CarrerasModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('carreras');
  }
}
