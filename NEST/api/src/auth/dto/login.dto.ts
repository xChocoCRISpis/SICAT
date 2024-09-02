import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class LoginDto{
    @IsString()
    @IsOptional()
    @Length(1,50)
    Nombre:string;

    @IsString()
    @IsEmail()
    @IsOptional()
    @Length(1,50)
    Correo:string;

    @IsString()
    @Length(2,25)
    Contrasena:string;
}