import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';
import { Bitacora } from 'src/schemas/bitacora/bitacora.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


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
      .getOne();
      
      return this.verifyLogin(login,Contrasena);
    }
    else if(loginDto.Correo){
      const login= await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.correo = :correo',{correo:Correo})
      .getOne();

      return this.verifyLogin(login,Contrasena);  
    }
    else throw new NotFoundException(`Login necesita nombre de usuario o correo de usuario`)
  }

  async verifyLogin(login:Usuario,Contrasena:string){
    if(!login) return {login:false,id:-1}

      const jwtToken=this.generateJwtToken(login.Correo,login.Nombre);
      const updateToken=await this.usuarioRepository.update(login.Id_usuario_pk, { Token: jwtToken });
      
      if(updateToken.affected < 1) throw new BadRequestException('No se pudo guardar el login');

      const match = await bcrypt.compare(Contrasena,login.Contrasena)

      if(!match) throw new UnauthorizedException('Contraseña incorrecta y/o Usuario incorrecto')
    
      return {login:true,id:login.Id_usuario_pk}
  }

  async createUser(createAuthDto: CreateAuthDto): Promise<{ token: string }> {
    const { Nombre, Contrasena, Correo, Tipo } = createAuthDto;

    // Verificar si el correo ya está registrado
    const emailUser = await this.usuarioRepository.findOne({ where: {Correo}});
    const nameUser =  await this.usuarioRepository.findOne({ where: {Nombre}});

    if (emailUser) throw new BadRequestException('Correo ya registrado');
    if (nameUser) throw new BadRequestException('Nombre de usuario ya registrado');

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Contrasena, salt);

    // Generar el JWT token
    const token = this.generateJwtToken(Correo,Nombre);

    // Crear el nuevo usuario
    const newUser = this.usuarioRepository.create({
      Nombre,
      Contrasena: hashedPassword, // Guardar la contraseña encriptada
      Correo,
      Tipo,
      Token: token,
    });

    await this.usuarioRepository.save(newUser);

    return { token };
  }

  private generateJwtToken(correo: string, usuario:string ): string {
    const payload = { correo,usuario };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
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
