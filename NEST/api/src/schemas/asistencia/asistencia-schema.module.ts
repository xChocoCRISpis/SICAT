import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asistencia, AsistenciaSchema } from './asistencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asistencia.name, schema: AsistenciaSchema }
    ], 'sicat_nest')  // Asegúrate de que esto coincida con el nombre de la conexión en tu AppModule
  ],
  providers: [],  // Agrega servicios aquí si los tienes
  controllers: [],  // Agrega controladores aquí si los tienes
  exports: [MongooseModule]  // Exporta servicios o módulos si es necesario
})
export class AsistenciaSchemaModule {}