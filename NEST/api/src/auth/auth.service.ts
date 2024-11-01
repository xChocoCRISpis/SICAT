import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/entities/usuarios.entity";
import { Repository } from "typeorm";
import { Bitacora } from "src/schemas/bitacora/bitacora.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as QRCode from "qrcode";
import * as crypto from "crypto";

import { ImgBBService } from "../services/imgbb/imgbb.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectModel(Bitacora.name, "sicat_nest")
    private readonly bitacoraModel: Model<Bitacora>,
    private readonly imgbbService: ImgBBService,
  ) {}

  async login(loginDto: LoginDto) {
    const { Nombre, Correo, Contrasena } = loginDto;

    if (loginDto.Nombre) {
      const login = await this.usuarioRepository
        .createQueryBuilder("usuario")
        .where("usuario.nombre = :nombre", { nombre: Nombre })
        .getOne();

      return this.verifyLogin(login, Contrasena);
    } else if (loginDto.Correo) {
      const login = await this.usuarioRepository
        .createQueryBuilder("usuario")
        .where("usuario.correo = :correo", { correo: Correo })
        .getOne();

      return this.verifyLogin(login, Contrasena);
    } else
      throw new NotFoundException(
        `Login necesita nombre de usuario o correo de usuario`,
      );
  }

  async verifyLogin(login: Usuario, Contrasena: string) {
    if (!login)
      throw new UnauthorizedException(
        "Contraseña incorrecta y/o Usuario incorrecto",
      );

    const jwtToken = this.generateJwtToken(login.Correo, login.Nombre);
    const updateToken = await this.usuarioRepository.update(
      login.Id_usuario_pk,
      { Token: jwtToken },
    );

    console.log(updateToken);

    if (updateToken.affected < 1)
      throw new BadRequestException("No se pudo guardar el login");

    const match = await bcrypt.compare(Contrasena, login.Contrasena);

    if (!match)
      throw new UnauthorizedException(
        "Contraseña incorrecta y/o Usuario incorrecto",
      );

    return {
      login: true,
      id: login.Id_usuario_pk,
      token: jwtToken,
      Nombre: login.Nombre,
    };
  }

  async createUser(createAuthDto: CreateAuthDto): Promise<{ token: string }> {
    const { Nombre, Contrasena, Correo, Tipo } = createAuthDto;

    // Verificar si el correo ya está registrado
    const emailUser = await this.usuarioRepository.findOne({
      where: { Correo },
    });
    const nameUser = await this.usuarioRepository.findOne({
      where: { Nombre },
    });

    if (emailUser) throw new BadRequestException("Correo ya registrado");
    if (nameUser)
      throw new BadRequestException("Nombre de usuario ya registrado");

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Contrasena, salt);

    // Generar el QR directamente en base64 para subirlo a ImgBB
    const [qrBase64, encodeData] = await this.generateQrBase64(Contrasena);
    const imgbbResponse = await this.imgbbService.uploadImage(qrBase64);
    const qrUrl = imgbbResponse.url;

    console.log(imgbbResponse);

    // Generar el JWT token
    const token = this.generateJwtToken(Correo, Nombre);

    // Crear el nuevo usuario en la base de datos con la URL de ImgBB
    const newUser = this.usuarioRepository.create({
      Nombre,
      Contrasena: hashedPassword, // Guardar la contraseña encriptada
      Cadena_qr: encodeData,
      Imagen_qr: qrUrl, // Guarda el enlace de ImgBB en lugar de la ruta local
      Correo,
      Tipo,
      Token: token,
    });

    await this.usuarioRepository.save(newUser);

    return { token };
  }

  private async convertImageToBase64(filePath: string): Promise<string> {
    const fs = await import("fs/promises");

    try {
      await fs.access(filePath); // Verificar si el archivo existe
      const image = await fs.readFile(filePath);
      return image.toString("base64");
    } catch (error) {
      throw new Error(
        `Error al leer el archivo QR en ${filePath}: ${error.message}`,
      );
    }
  }

  private generateJwtToken(correo: string, usuario: string): string {
    const payload = { correo, usuario };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
  }

  private async generateQrBase64(
    cadena: string,
  ): Promise<[base64: string, encodeData: string]> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedData = await bcrypt.hash(cadena, salt);

      // Generar QR en base64
      const qrBase64 = await QRCode.toDataURL(hashedData, {
        type: "image/png",
        width: 500,
        margin: 4,
        errorCorrectionLevel: "H",
        color: {
          dark: "#5A0A18",
          light: "#FFFFFF",
        },
      });

      // Retirar el prefijo "data:image/png;base64," del base64
      const base64Data = qrBase64.replace(/^data:image\/png;base64,/, "");

      return [base64Data, hashedData];
    } catch (error) {
      throw new Error(`Error al generar el QR en base64: ${error}`);
    }
  }

  private async generateQr(
    cadena: string,
  ): Promise<[path: string, encodeData: string]> {
    // Encriptar la contraseña
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedData = await bcrypt.hash(cadena, salt);
      const name: string = `${crypto.randomBytes(8).toString("hex")}-${crypto.randomBytes(8).toString("hex")}-${crypto.randomBytes(8).toString("hex")}-${crypto.randomBytes(6).toString("hex")}`;
      const path: string = `${process.env.FILE_PATH}/encargados/qr/${name}.png`;
      console.log(path);

      await QRCode.toFile(path, hashedData, {
        type: "png" as const,
        width: 500,
        margin: 4,
        errorCorrectionLevel: "H" as const,
        color: {
          dark: "5A0A18",
          light: "FFFFFF",
        },
      });
      return [name, hashedData];
    } catch (error) {
      throw new Error(`Error al generar el QR: ${error}`);
    }
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
