import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  async findProfile
  (@Req() req:Request, 
  @Query('year')year?:string,
  @Query('semestre') semestre?:string)
  {
    try {
      const user = req['Usuario'];
      const data = await this.userService.profile(user.Id_usuario_pk, year, semestre);
      let tipo:string;

      switch(user.Tipo){
        case(1):
          tipo="Encargado de actividades extraescolares";
          break;
        case(2):
          tipo ="Encargado secundario";
          break;
        case(3):
          tipo = "Profesor";
          break;
        default:
          tipo = "Default";
          break;
      }
      const usuario = {
        usuario: {
          username: user.Nombre,
          correo: user.Correo,
          qr: user.Imagen_qr,
        },
        encargado: {...data.encargado, tipo},
        horarios: data.horarios,
      };
  
      return usuario;
    } catch (error) {
      // Manejar cualquier error inesperado aquí
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
