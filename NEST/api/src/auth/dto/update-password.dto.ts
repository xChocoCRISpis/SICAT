import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdatePasswordDto{
    @IsString()
    @Length(8,150)
    Contrasena:string;

    @IsString()
    @Length(1,50)
    Code:string;
}