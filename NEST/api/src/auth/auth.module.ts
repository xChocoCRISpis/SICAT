import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { BitacoraSchemaModule } from 'src/schemas/bitacora/bitacora-schema.module';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario]),
  BitacoraSchemaModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
