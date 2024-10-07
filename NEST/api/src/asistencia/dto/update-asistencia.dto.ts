import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAsistenciaDto {
  @IsNumber()
  @IsNotEmpty()
  horas: number;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : new Date()) // Transformar a fecha actual si no se proporciona
  @Type(() => Date)  // Garantiza que el tipo sea `Date`
  fecha: Date = new Date();
  }