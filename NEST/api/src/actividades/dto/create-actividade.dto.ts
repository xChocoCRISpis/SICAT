import { IsString, Length } from "class-validator";

export class CreateActividadeDto {

    @IsString()
    @Length(5,200)
    readonly Nombre:string;

    @IsString()
    @Length(1,3)
    readonly Tipo:string;
}
