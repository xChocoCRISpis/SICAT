import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import {Request,Response} from 'express'
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';



@Injectable()
export class AuthMiddleware implements NestMiddleware {
  
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository:Repository<Usuario>)
    
  {}

  async use(req:Request, res: Response, next: () => void) {
    const authHeader = req.headers['authorization'];

    if(!authHeader) throw new UnauthorizedException("Token no ingresado");

    const token = authHeader.split(' ')[1];

    try{
      const decoded:any = jwt.verify(token,process.env.JWT_SECRET);

      const usuario = await this.usuarioRepository.findOne({where:{
        Nombre:decoded.nombre,Correo:decoded.correo
      }});

      if(!usuario) throw new UnauthorizedException('Token inválido');

      req['Usuario'] = usuario;
      
      console.log(decoded);
      console.log(req['Usuario']);
      

      next();
    }catch(error){
      console.log(error);
      throw new UnauthorizedException('Error al verificar el Token');
    }
  }
}
