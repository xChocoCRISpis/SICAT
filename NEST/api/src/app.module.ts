import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlumnosModule } from './alumnos/alumnos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AsistenciaSchemaModule } from './schemas/asistencia/asistencia-schema.module';
import { BitacoraSchemaModule } from './schemas/bitacora/bitacora-schema.module';
import { ChecadorSchemaModule } from './schemas/checador/checador-schema.module';
import { BitacoraModule } from './bitacora/bitacora.module'
import { BitacoraController } from './bitacora/bitacora.controller';
import { BitacoraService } from './bitacora/bitacora.service';
import { AuthModule } from './auth/auth.module';
import { ActividadesModule } from './actividades/actividades.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {isGlobal:true}
    ),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_URI,
      { connectionName: 'sicat_nest' }
    ),
    AlumnosModule,
    AsistenciaSchemaModule,
    ChecadorSchemaModule,
    BitacoraSchemaModule,
    BitacoraModule,
    AuthModule,
    ActividadesModule
  ],
  controllers: [AppController, BitacoraController],
  providers: [AppService],
})
export class AppModule {}