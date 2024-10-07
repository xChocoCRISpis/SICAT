import { Injectable } from '@nestjs/common';
import { AsistenciaDetallesDto } from './dto/create-asistencia.dto';
import { DetallesAsistencia } from 'src/schemas/asistencia/detalles-asistencia.schema';
import { Asistencia } from 'src/schemas/asistencia/asistencia.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AsistenciaService {

  constructor(
    @InjectModel(Asistencia.name, 'sicat_nest')  private readonly asistenciaModel: Model<Asistencia>,
    @InjectModel(Asistencia.name, 'sicat_nest')  private readonly asistenciaDetallesModel: Model<DetallesAsistencia>,
  ) {}

  async crearAsistencia(id_pertenece: number, id_encargado: number, detallesAsistenciaDto: AsistenciaDetallesDto) {
    // Verificar que id_pertenece no sea nulo o indefinido
    if (!id_pertenece) {
      throw new Error('El campo id_pertenece es obligatorio');
    }
    const { horas,fecha } = detallesAsistenciaDto;

      try {
        return await this.asistenciaModel.findOneAndUpdate(
          { id_pertenece }, // Condición de búsqueda
          { $push: { asistencia_detalle: {id_encargado,fecha,horas} as DetallesAsistencia} }, // Actualización (añadir detalle)
          { upsert: true, new: true } // Crea un nuevo registro si no existe, devuelve el documento actualizado
        );  
      } catch (error) {                                                                                                                         
        if (error.name === 'ValidationError') {
          console.error('Error de validación:', error.message);
          throw new Error('Error de validación al guardar la asistencia');
        }
        throw error;
      }
    }


  // Traer todas las asistencias
  async traerTodasEncargado(id_encargado:number) {
    console.log(id_encargado);
    return await this.asistenciaModel.find({'asistencia_detalle.id_encargado':id_encargado});
  }

  async traerTodasAlumno(id_pertenece:number){
    return await this.asistenciaModel.find({id_pertenece})
  }


  // Actualizar asistencia por ID de encargado
  async actualizarPorEncargado(id_encargado: number, fecha: Date, horas: number) {
    const asistencia = await this.asistenciaModel.findOneAndUpdate(
      { 'asistencia.id_encargado': id_encargado, 'asistencia.fecha': fecha },
      { $set: { 'asistencia.$.horas': horas } },
      { new: true },
    );
    if (!asistencia) throw new Error('No se encontró la asistencia');
    return asistencia;
  }

  // Eliminar asistencia por ID de encargado
  async eliminarPorEncargado(id_encargado: number) {
    const asistencia = await this.asistenciaModel.findOneAndUpdate(
      { 'asistencia.id_encargado': id_encargado },
      { $pull: { asistencia: { id_encargado } } },
      { new: true },
    );
    if (!asistencia) throw new Error('No se encontró la asistencia');
    return { message: 'Asistencia eliminada' };
  }

  // Obtener horas por id_pertenece
  async obtenerHorasPorIdPertenece(id_pertenece: number) {
      const result = await this.asistenciaModel.aggregate([
        { $match: { id_pertenece: id_pertenece } }, // Filtrar por id_pertenece
        { $unwind: '$asistencia_detalle' }, // Descomponer el array de asistencia_detalle
        {
          $group: {
            _id: '$id_pertenece', // Agrupar por id_pertenece
            totalHoras: { $sum: '$asistencia_detalle.horas' }, // Sumar las horas
          },
        },
      ]);

      // Devolver el resultado, 0 si no se encontró
      return result.length > 0 ? { totalHoras: result[0].totalHoras } : { totalHoras: 0 };
  }
}
