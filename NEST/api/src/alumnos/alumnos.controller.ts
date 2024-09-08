import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAlumnoDto } from './dtos/create-alumno.dto';
import { AlumnosService } from './alumnos.service';


@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get()
  getAllAlumnos() {
    return this.alumnosService.findAll();
  }

  @Get('/buscar')
  getByIdAlumnos(@Query('num_control') num_control: string) {
    if (!num_control) {
      return { message: "num_control es obligatorio" };  // Retornar un mensaje si no se pasa el parámetro
    }
    const alumno = this.alumnosService.findOne(num_control);
    console.log(alumno);
    return alumno;
  }

  @UseInterceptors(
    FileInterceptor('Foto', {
      storage: diskStorage({
        destination: './uploads/alumnos', // Carpeta donde se guardarán las imágenes
        filename: (req, file, cb) => {
          // Acceder a Num_control desde el body de la solicitud
          const createAlumnoDto = req.body as CreateAlumnoDto;
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${createAlumnoDto.Num_control}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @Post("create")
  createAlumno(@Body() createAlumnoDto:CreateAlumnoDto, @UploadedFile() imagen: Express.Multer.File) {
    const alumno = this.alumnosService.createAlumno(createAlumnoDto,imagen);
    return alumno;
  }
}

