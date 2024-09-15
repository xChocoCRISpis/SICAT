import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraer el token del header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Clave secreta para verificar el token
    });
  }

  // Este método se ejecuta si el token es válido
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Retorna los datos del usuario extraídos del token
  }
}