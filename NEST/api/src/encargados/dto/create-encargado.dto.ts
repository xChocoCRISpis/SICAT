import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateEncargadoDto {
    @IsString()
    @Length(1, 150)
    Nombre: string;

    @IsString()
    @Length(1, 150)
    Ap_paterno: string;

    @IsString()
    @Length(1, 150)
    Ap_materno: string;

    @IsInt()
    @IsNotEmpty()
    Id_usuarios_fk:number;
}
