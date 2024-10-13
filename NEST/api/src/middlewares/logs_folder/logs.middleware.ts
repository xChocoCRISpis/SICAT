import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bitacora } from '../../schemas/bitacora/bitacora.schema';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Bitacora.name, 'sicat_nest')  private readonly bitacoraModel: Model<Bitacora>,  // Asegúrate de inyectar correctamente el modelo
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const id_usuario = req['Usuario'].Id_usuario_pk;
      const fecha = new Date();
      const hora = fecha.toISOString().split('T')[1].split('.')[0];
      let accion = `${req.method} ${req.originalUrl}`;

      if (req['logMessage']) {
        accion = req['logMessage'];
        delete req['logMessage'];  // Eliminar la propiedad logMessage de res
      }
        

      const nuevoDetalle = {
        fecha,
        hora,
        accion,
      };

      await this.bitacoraModel.findOneAndUpdate(
        { id_usuario }, // Condición de búsqueda
        { $push: { bitacora_detalle: nuevoDetalle } }, // Actualización (añadir detalle)
        { upsert: true, new: true } // Crea un nuevo registro si no existe, devuelve el documento actualizado
      );
    });
    next();
  }
}
