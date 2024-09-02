import {SchemaFactory,Schema,Prop} from '@nestjs/mongoose';

@Schema({_id:false})
export class ChecadorDetalles{

    @Prop({type:String, require:true})
    hora:string;

    @Prop({type:Date,require:true})
    fecha:Date;

    @Prop({type:Number, require:true})
    id_horario:number;
}

export const ChecadorDetallesSchema = SchemaFactory.createForClass(ChecadorDetalles);
