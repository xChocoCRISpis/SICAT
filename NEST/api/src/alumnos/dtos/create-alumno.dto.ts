import { Type } from "class-transformer";
import { IsNumber, Length, Validator, IsString, IsOptional, IsIn, IsEmail, IsInt, IsDateString } from "class-validator";

export class CreateAlumnoDto{

    @IsString()
    @Length(9, 10)
    readonly Num_control: string;

    @IsString()
    @Length(1, 150)
    readonly Nombre: string;

    @IsString()
    @Length(1, 150)
    readonly Ap_paterno: string;

    @IsString()
    @Length(1, 150)
    readonly Ap_materno: string;

    @IsString()
    @Length(1, 1)
    @IsIn(['M', 'F'])
    readonly Sexo: string;

    @IsDateString()
    readonly Fecha_nac: string;

    @IsInt()
    @Type(()=>Number)
    readonly Semestre: number;

    @IsInt()
    @Type(()=>Number)
    readonly Nivel: number;

    @IsOptional()
    @IsString()
    readonly Foto?: string;

    @IsString()
    @Length(10, 12)
    readonly Telefono: string;

    @IsEmail()
    readonly Correo: string;

    @IsInt()
    @Type(()=>Number)
    readonly carrera: number;

}