import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';

@Controller('alumnos')
export class AlumnosController {

    constructor(private readonly alumnosService:AlumnosService){

    }


    @Get()
    getAllAlumnos() {
        return this.alumnosService.getAll();
    }

    @Get("/:id")
    getByIdAlumnos( @Param ("id",ParseIntPipe) id:number){
        const alumno = this.alumnosService.getById(id);
        console.log(alumno);
        return alumno;
    }

    @Post()
    createAlumno(@Body() body:any){
        return { ...body, method: "post" };
    }
}
