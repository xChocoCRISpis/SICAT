import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlumnosModule } from './alumnos/alumnos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { hostname } from 'os';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:"mysql",
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password:process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities:[__dirname + '/**/*.entity{.ts,.js}']
    }),
    AlumnosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
