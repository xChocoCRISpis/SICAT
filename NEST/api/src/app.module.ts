import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlumnosModule } from './alumnos/alumnos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

configService: ConfigService;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga el archivo .env y hace que las variables de entorno sean globales
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa el ConfigModule para poder inyectar ConfigService
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: +configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ajusta la ruta según tu estructura de proyecto
        synchronize: true, // Sincroniza la base de datos en cada inicio, útil para desarrollo
      }),
      inject: [ConfigService], // Inyecta ConfigService
    }),
    AlumnosModule,
    // Otros módulos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
