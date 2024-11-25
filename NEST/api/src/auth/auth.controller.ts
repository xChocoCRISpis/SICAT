import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.authService.login(loginDto);
  }
  @Post("/createUser")
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createUser(createAuthDto);
  }

  @Post("/changePassword")
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    console.log(changePasswordDto);
    if (changePasswordDto.Correo && changePasswordDto.Nombre) {
      throw new BadRequestException("Se necesita una propiedad 'Correo' o 'Nombre'");
    }

    return this.authService.changePassword(changePasswordDto);
  }

  @Patch("/password")
  updatePassword(@Body() updatePasswordDto:UpdatePasswordDto){
    console.log(updatePasswordDto);
    return this.authService.updatePassword(updatePasswordDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id);
  }
}
