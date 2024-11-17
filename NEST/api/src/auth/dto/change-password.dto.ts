import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class ChangePasswordDto{
    @IsString()
    @IsOptional()
    @Length(1,50)
    Nombre:string;

    @IsString()
    @IsEmail()
    @IsOptional()
    @Length(1,50)
    Correo:string;
}