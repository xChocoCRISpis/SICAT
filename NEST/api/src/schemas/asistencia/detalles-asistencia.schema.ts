import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class DetallesAsistencia extends Document {
  @Prop({ type: Number, required: true })
  id_encargado: number;

  @Prop({ type: String, required: true })
  fecha: string;

  @Prop({ type: Number, required: true })
  horas: number;
}

export const DetallesAsistenciaSchema = SchemaFactory.createForClass(DetallesAsistencia);