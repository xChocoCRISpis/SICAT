import { Type } from "class-transformer";
import { IsDate, IsInt, IsString, IsTimeZone, Length, Matches } from "class-validator";

export class CreateEventoDto {
    @IsString()
    @Length(1,300)
    readonly Nombre:string;

    @IsString()
    @Length(1,300)
    readonly Lugar:string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Fecha must be in YYYY-MM-DD format',
    }) // Valida que la fecha sea en formato ISO
    readonly Fecha: string;
  
    @IsString()
    @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Hora must be in HH:mm format',
    }) // Valida que la hora sea en formato HH:mm
    readonly Hora: string;

    @IsInt()
    readonly Id_Actividad:number;

}
