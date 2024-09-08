import { IsIn, IsString,IsInt, IsOptional, Length, MaxLength, IsEmail } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @Length(4,50)
    Nombre:string;

    @IsString()
    @Length(8,25)
    Contrasena:string;

    @IsInt()
    Tipo:number;

    @IsString()
    @IsOptional()
    Cadena_qr:string;

    @IsString()
    @IsOptional()
    Imagen_qr:string;

    @IsString()
    @IsEmail()
    @Length(1,50)
    Correo:string;

/*     @IsString()
    Token:string; */
}
