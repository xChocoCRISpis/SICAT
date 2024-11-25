import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadeDto } from './create-actividade.dto';
import { IsInt } from 'class-validator';

export class UpdateActividadeDto extends PartialType(CreateActividadeDto) {
    @IsInt()
    readonly Id:number;
}
