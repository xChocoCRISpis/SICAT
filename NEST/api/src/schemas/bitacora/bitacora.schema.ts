import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {BitacoraDetalles,BitacoraDetallesSchema} from './bitacora-detalles.schema';


@Schema({ collection: 'bitacora'})
export class Bitacora extends Document {
    @Prop({ type: Number, required: true })
    id_usuario: number;

    @Prop({ type: [BitacoraDetallesSchema], required: true })
    bitacora_detalle: BitacoraDetalles[];
}

export const BitacoraSchema = SchemaFactory.createForClass(Bitacora);