import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AlumnosModule } from "./alumnos/alumnos.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AsistenciaSchemaModule } from "./schemas/asistencia/asistencia-schema.module";
import { BitacoraSchemaModule } from "./schemas/bitacora/bitacora-schema.module";
import { ChecadorSchemaModule } from "./schemas/checador/checador-schema.module";
import { BitacoraModule } from "./bitacora/bitacora.module";
import { BitacoraController } from "./bitacora/bitacora.controller";
import { BitacoraService } from "./bitacora/bitacora.service";
import { AuthModule } from "./auth/auth.module";
import { ActividadesModule } from "./actividades/actividades.module";
import { UserModule } from "./user/user.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AsistenciaModule } from "./asistencia/asistencia.module";
import { ChecadorModule } from "./checador/checador.module";
import { ImgBBService } from "./services/imgbb/imgbb.service";
import { EventosModule } from './eventos/eventos.module';
import { MailService } from './common/mail/mail.service';
import { MailModule } from './common/mail/mail.module';
<<<<<<< HEAD
import { EncargadosModule } from './encargados/encargados.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { CarrerasModule } from './carreras/carreras.module';
=======
>>>>>>> b5723ec155c0a57df4b796e32dc13ff8e5c7757f

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI_ATLAS, { connectionName: "sicat_nest" }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"), // Ruta de tu carpeta con archivos estáticos
      serveRoot: "/uploads", // Ruta pública desde la cual se acceden los archivos
    }),
    AlumnosModule,
    AsistenciaSchemaModule,
    ChecadorSchemaModule,
    BitacoraSchemaModule,
    BitacoraModule,
    AuthModule,
    ActividadesModule,
    UserModule,
    AsistenciaModule,
    ChecadorModule,
    EventosModule,
    MailModule,
<<<<<<< HEAD
    EncargadosModule,
    EstadisticasModule,
    CarrerasModule,
=======
>>>>>>> b5723ec155c0a57df4b796e32dc13ff8e5c7757f
  ],
  controllers: [AppController, BitacoraController],
  providers: [AppService, ImgBBService, MailService],
})
export class AppModule {}
