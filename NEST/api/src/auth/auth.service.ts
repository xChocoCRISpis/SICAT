import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';
import { Bitacora } from 'src/schemas/bitacora/bitacora.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository:Repository<Usuario>,
    @InjectModel(Bitacora.name, 'sicat_nest') private readonly bitacoraModel:Model<Bitacora>)
  {}

  async login(loginDto:LoginDto){
    const {Nombre,Correo,Contrasena} = loginDto;

    if(loginDto.Nombre){
      const login= await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.nombre = :nombre',{nombre:Nombre})
      .andWhere('usuario.contrasena = :contrasena',{contrasena:Contrasena})
      .getOne();

      if(!login) return {login:false,id:-1}
      return {login:true,id:login.Id_usuario_pk}
    }
    else if(loginDto.Correo){
      const login= await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.correo = :correo',{correo:Correo})
      .andWhere('usuario.contrasena = :contrasena',{contrasena:Contrasena})
      .getOne();

      if(!login) return {login:false,id:-1}
      return {login:true,id:login.Id_usuario_pk}
    }
    else throw new NotFoundException(`Login necesita nombre de usuario o correo de usuario`)
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
