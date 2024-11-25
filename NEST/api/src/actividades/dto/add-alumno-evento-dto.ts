import { IsInt, IsString, Length } from "class-validator";

export class AddAlumnoEventoDto {
    @IsInt()
    readonly id_alumno: number;
    @IsInt()
    readonly id_evento: number;
}
