import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({_id:false})
export class BitacoraDetalles{

    @Prop({type:Date, require:true})
    fecha:Date;

    @Prop({type: String, require: true})
    hora: String;

    @Prop({type:String, require:true})
    accion:String;

}

export const BitacoraDetallesSchema = SchemaFactory.createForClass(BitacoraDetalles);