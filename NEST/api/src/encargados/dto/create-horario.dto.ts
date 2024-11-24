import { IsInt, IsString, Length } from "class-validator";
import { IsTime } from "src/decorators/IsTime.decorator";
import { IsHorario } from "src/decorators/isHorario.decorator";

export class CreateHorarioDto {
    @IsInt()
    Encargado_id: number;

    @IsString()
    @Length(8, 15)
    @IsHorario()
    Dia: string;

    @IsTime()
    Hora_inicio: string;

    @IsTime()
    Hora_fin: string;
}
