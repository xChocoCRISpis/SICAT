
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEncargadoDto {
    @IsString()
    @Length(1, 150)
    @IsOptional()
    Nombre: string;

    @IsString()
    @Length(1, 150)
    @IsOptional()
    Ap_paterno: string;

    @IsString()
    @Length(1, 150)
    @IsOptional()
    Ap_materno: string;
}
