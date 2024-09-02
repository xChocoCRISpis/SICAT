import { IsInt, IsDate, IsString, IsArray, ValidateNested, IsNotEmpty,ArrayNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateBitacoraDto {
    @IsInt()
    @IsNotEmpty()
    id_usuario: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BitacoraDetallesDto)
    @IsNotEmpty()
    @ArrayNotEmpty()
    bitacora_detalle: BitacoraDetallesDto[];
  }
  
export class BitacoraDetallesDto {
    @IsDate()
    @Type(() => Date)
    fecha: Date;
  
    @IsString()
    @IsNotEmpty()
    hora: string;
  
    @IsString()
    @IsNotEmpty()
    accion: string;
  }
  