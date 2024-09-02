import {SchemaFactory,Schema,Prop} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ChecadorDetalles,ChecadorDetallesSchema} from './checador-detalles.schema';

@Schema({collection:'checador'})
export class Checador extends Document{

    @Prop({type:Number, require:true})
    id_encargado:number;

    @Prop({type:[ChecadorDetallesSchema],require:true})
    checador_detalle:ChecadorDetalles[];
}

export const ChecadorSchema = SchemaFactory.createForClass(Checador);