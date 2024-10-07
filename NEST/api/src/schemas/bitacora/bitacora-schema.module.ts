import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bitacora, BitacoraSchema } from './bitacora.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bitacora.name, schema: BitacoraSchema }], 'sicat_nest'),
  ],
  exports: [MongooseModule], // Exportar para que esté disponible en otros módulos
})
export class BitacoraSchemaModule {}
