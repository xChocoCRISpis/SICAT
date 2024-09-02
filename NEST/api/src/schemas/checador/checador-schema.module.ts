import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Checador, ChecadorSchema } from './checador.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{schema:ChecadorSchema,name:Checador.name}],
            'sicat_nest'
        )
    ],
    exports:[MongooseModule]
})
export class ChecadorSchemaModule {}
