import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({_id:false})
export class BitacoraDetalles{

    @Prop({type:Date, require:true})
    fecha:Date;

    @Prop({type: String, require: true})
    hora: string;

    @Prop({type:String, require:true})
    accion:string;

}

export const BitacoraDetallesSchema = SchemaFactory.createForClass(BitacoraDetalles);