import { Module } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { BitacoraController } from './bitacora.controller';
import { BitacoraSchemaModule } from 'src/schemas/bitacora/bitacora-schema.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';

@Module({
  imports:[BitacoraSchemaModule,
    TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [BitacoraController],
  providers: [BitacoraService],
  exports: [BitacoraService],
})
export class BitacoraModule {}
