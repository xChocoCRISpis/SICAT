import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { IsTime } from 'src/decorators/IsTime.decorator';
import { IsHorario } from 'src/decorators/isHorario.decorator';

export class UpdateHorarioDto {
    @IsString()
    @Length(8, 15)
    @IsHorario()
    @IsOptional()
    Dia: string;

    @IsTime()
    @IsOptional()
    Hora_inicio: string;

    @IsTime()
    @IsOptional()
    Hora_fin: string;
}
