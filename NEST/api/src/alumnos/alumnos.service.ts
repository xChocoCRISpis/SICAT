import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AlumnosService {
    private Alumnos = [{
        id:0,
        nombre:"juan"
    },{
        id:1,
        nombre:"pedro"
    },{
        id:2,
        nombre:"wereka"
    }]

    getAll(){
        return this.Alumnos;
    }

    getById(id:number){
        const alumno = this.Alumnos.find((alumno)=>alumno.id === id)
        if(!alumno) throw new NotFoundException(`No se encontro el ${id}`); 
        return alumno;
    }

}
