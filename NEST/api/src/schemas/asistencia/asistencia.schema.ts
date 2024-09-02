import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DetallesAsistencia, DetallesAsistenciaSchema } from './detalles-asistencia.schema';

@Schema({ collection: 'asistencia' })
export class Asistencia extends Document {
  @Prop({ type: Number, required: true })
  id_pertenece: number;

  @Prop({ type: [DetallesAsistenciaSchema] })
  asistencia_detalle: DetallesAsistencia[];
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
