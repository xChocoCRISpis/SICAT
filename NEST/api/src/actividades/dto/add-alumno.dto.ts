import { IsInt, IsString, Length } from "class-validator";

export class AddAlumnoDto {
    @IsInt()
    readonly id_alumno: number;
    @IsInt()
    readonly id_actividad: number;
}
