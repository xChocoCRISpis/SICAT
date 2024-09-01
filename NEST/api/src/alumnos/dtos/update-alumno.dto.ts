import { IsNumber, Length, Validator, IsString, IsOptional, IsIn, IsEmail, IsInt, IsDateString, isInt } from "class-validator";

export class CreateAlumnoDto{

    @IsInt()
    readonly id:number;

    @IsOptional()
    @IsString()
    @Length(9, 10)
    readonly numControl?: string;

    @IsOptional()
    @IsString()
    @Length(1, 150)
    readonly nombre?: string;

    @IsOptional()
    @IsString()
    @Length(1, 150)
    readonly apPaterno?: string;

    @IsOptional()
    @IsString()
    @Length(1, 150)
    readonly apMaterno?: string;

    @IsOptional()
    @IsString()
    @Length(1, 1)
    @IsIn(['M', 'F'])
    readonly sexo?: string;

    @IsOptional()
    @IsDateString()
    readonly fechaNac?: string;

    @IsOptional()
    @IsInt()
    readonly semestre?: number;

    @IsOptional()
    @IsInt()
    readonly nivel?: number;

    @IsOptional()
    @IsString()
    readonly foto?: string;

    @IsOptional()
    @IsString()
    @Length(10, 12)
    readonly telefono?: string;

    @IsOptional()
    @IsEmail()
    readonly correo?: string;

    @IsOptional()
    @IsInt()
    readonly carrera_id?: number;

}