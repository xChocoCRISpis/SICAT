import { Type, Transform } from 'class-transformer';
import { IsNotEmpty, IsArray, IsNumber, ValidateNested, IsDateString, IsString, ArrayNotEmpty, ArrayMaxSize, IsDate, IsOptional} from 'class-validator';

export class CreateAsistenciaDto {
  @IsNumber()
  @IsNotEmpty()
  id_pertenece:number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(1)
  @ValidateNested({ each: true })
  @Type(() => AsistenciaDetallesDto)
  asistencia: AsistenciaDetallesDto[];
}

export class AsistenciaDetallesDto {
  @IsNumber()
  @IsNotEmpty()
  horas: number;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : new Date()) // Transformar a fecha actual si no se proporciona
  @Type(() => Date)  // Garantiza que el tipo sea `Date`
  fecha: Date = new Date();
}