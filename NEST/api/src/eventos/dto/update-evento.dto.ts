import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDto } from './create-evento.dto';
import { IsInt } from 'class-validator';

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
    @IsInt()
    readonly Id_Evento:number;
}
