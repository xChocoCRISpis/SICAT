import { BadRequestException, Body, Controller, Get, ParseIntPipe, Post, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, Multer } from "multer";
import { extname } from "path";
import { CreateAlumnoDto } from "./dtos/create-alumno.dto";
import { AlumnosService } from "./alumnos.service";

@Controller("alumnos")
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get("actividad")
  getAllByActividad(
    @Query("id") actividad?: number,
    @Query("num_control") num_control?: string,
    @Query("nombre") nombre?: string,
    @Query("ap_paterno") ap_paterno?: string,
    @Query("sexo") sexo?: string,
    @Query("semestre") semestre?: string,
    @Query("page", ParseIntPipe) page: number = 1,
    @Query("limit", ParseIntPipe) limit: number = 50
  ) {
    console.log("FindAllByActividad");
    console.log(actividad, num_control, nombre, ap_paterno, sexo, semestre, page);
    console.log("___________________________");
    return this.alumnosService.findAllFromActividad(
      actividad,
      num_control,
      nombre,
      ap_paterno,
      sexo,
      semestre ? parseInt(semestre, 10) : undefined,
      page,
      limit
    );
  }

  @Get()
  getAllAlumnos(
    @Query("num_control") num_control?: string,
    @Query("nombre") nombre?: string,
    @Query("ap_paterno") ap_paterno?: string,
    @Query("sexo") sexo?: string,
    @Query("semestre") semestre?: number,
    @Query("nombre_corto") nombre_corto?: string,
    @Query("page") page?: number
  ) {
    return this.alumnosService.findAllWithCarreras(num_control, nombre, ap_paterno, sexo, semestre, nombre_corto, page);
  }

  @Get("/buscar")
  getByIdAlumnos(@Query("id") id: number) {
    return this.alumnosService.getAlumnoDetail(id);
  }

  @UseInterceptors(
    FileInterceptor("Foto", {
      storage: diskStorage({
        destination: "./uploads/alumnos", // Carpeta donde se guardarán las imágenes
        filename: (req, file, cb) => {
          // Acceder a Num_control desde el body de la solicitud
          const createAlumnoDto = req.body as CreateAlumnoDto;
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${createAlumnoDto.Num_control}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    })
  )
  @Post("create")
  createAlumno(@Body() createAlumnoDto: CreateAlumnoDto, @UploadedFile() imagen: Express.Multer.File) {
    const alumno = this.alumnosService.createAlumno(createAlumnoDto, imagen);
    return alumno;
  }

  @Get("by_encargado")
  getByEncargado(
    @Req() req: any, // Objeto de la solicitud para obtener datos adicionales
    @Query("actividad") actividad: number,
    @Query("num_control") num_control?: string,
    @Query("nombre") nombre?: string,
    @Query("ap_paterno") ap_paterno?: string,
    @Query("sexo") sexo?: string,
    @Query("semestre") semestre?: number,
    @Query("nombre_corto") nombre_corto?: string,
    @Query("page") page?: number
  ) {
    const usuario = req['Usuario'];
    if(!actividad)
      throw new BadRequestException('Es requerido el campo "actividad" por query param');
    if(page)
      return this.alumnosService.findAllFilterByEncargado(
        usuario.Id_usuario_pk,
        actividad,
        num_control,
        nombre,
        ap_paterno,
        sexo,
        semestre,
        nombre_corto,
        +page
      );
    else 
      return this.alumnosService.findAllFilterByEncargado(
        usuario.Id_usuario_pk,
        actividad,
        num_control,
        nombre,
        ap_paterno,
        sexo,
        semestre,
        nombre_corto,
      );
  }

  @Get('detalle-actividad')
  async getAlumnoActividad(
    @Query('alumno') idAlumno: number,
    @Query('actividad') idActividad: number,
  ) {
    const errors = [];
    if(!idAlumno)
      throw new BadRequestException('Es requerido el campo "alumno" por query param');
    if(!idActividad)
      throw new BadRequestException('Es requerido el campo "actividad" por query param');

    return await this.alumnosService.findAlumnoActividad(+idAlumno, +idActividad);
  }
}
