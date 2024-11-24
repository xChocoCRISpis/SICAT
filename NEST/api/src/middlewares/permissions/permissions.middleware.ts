import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckPermissionsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const usuario = req['Usuario']; // Obtiene el usuario de la solicitud (presumiblemente inyectado en un middleware anterior)

    // Verificar si el usuario tiene permisos (Tipo === 1 o Tipo === 2)
    if (usuario && (usuario.Tipo === 1 || usuario.Tipo === 2)) {
      return next(); // Permite continuar con la solicitud
    }

    // Lanzar un error si no tiene permisos
    throw new HttpException('No tienes permisos para realizar esta acción', HttpStatus.FORBIDDEN);
  }
}
