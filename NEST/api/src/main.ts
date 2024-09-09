import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir solicitudes solo desde esta URL
    methods: 'GET,POST,PATCH,DELETE', // Métodos permitidos
    credentials: true, // Si usas cookies, establece esto en true
  });
  //Validation Pipe Configuration
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
  );
  await app.listen(+process.env.PORT);
  console.log(`API ESCUCHANDO EN EL PUERTO: ${+process.env.PORT}`)
}
bootstrap();
