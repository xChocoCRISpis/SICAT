import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";
import { IsTime } from "src/decorators/IsTime.decorator";
import { IsHorario } from "src/decorators/isHorario.decorator";

export class CreateHorarioDto {
    @IsInt()
    @IsNotEmpty({ message: 'El ID del encargado es obligatorio' })
    Id_encargado_fk: number;
  
    @IsInt()
    @IsNotEmpty({ message: 'El ID de la actividad es obligatorio' })
    Id_actividad_fk: number;

    @IsString()
    @Length(8, 15)
    @IsHorario()
    Dia: string;

    @IsTime()
    Hora_inicio: string;

    @IsTime()
    Hora_fin: string;
}
