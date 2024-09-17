import { PartialType } from '@nestjs/mapped-types';
import { CreateChecadorDto } from './create-checador.dto';

export class UpdateChecadorDto extends PartialType(CreateChecadorDto) {}
