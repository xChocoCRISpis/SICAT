import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from 'src/entities/eventos.entity';
import { Repository } from 'typeorm';
import { Actividad } from 'src/entities/actividades.entity';

@Injectable()
export class EventosService {

  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
    @InjectRepository(Actividad)
    private readonly actividadRepo: Repository<Actividad>,
  ){}

  async create(createEventoDto: CreateEventoDto) {
    // Busca la actividad por el ID proporcionado en el DTO
    const actividad = await this.actividadRepo.findOne({
      where: { Id_actividad_pk: createEventoDto.Id_Actividad },
    });
  
    if (!actividad) {
      throw new Error('Actividad no encontrada'); // Maneja el caso de actividad no existente
    }
  
    // Crea una nueva instancia del evento
    const nuevoEvento = this.eventoRepo.create({
      Nombre: createEventoDto.Nombre,
      Lugar: createEventoDto.Lugar,
      Fecha: createEventoDto.Fecha,
      Hora: createEventoDto.Hora,
      actividad, // Asocia la actividad encontrada
    });
  
    // Guarda el evento en la base de datos
    const result = await this.eventoRepo.save(nuevoEvento);
    return result;
  }
  

  async findAll() {
    const evento = await this.eventoRepo.find({relations:['actividad']});
    return evento;
  }

  async findOne(id: number) {
    const evento = await this.eventoRepo.findOne({relations:['actividad'], where:{Id_evento_pk:id}});
    return evento;
  }

  async update(updateEventoDto: UpdateEventoDto) {
    // Busca el evento a actualizar
    const evento = await this.eventoRepo.findOne({ where: { Id_evento_pk: updateEventoDto.Id_Evento } });
    if (!evento) {
      throw new NotFoundException(`Evento con id ${updateEventoDto.Id_Evento } no encontrado`);
    }

    // Si se envía un Id_Actividad, busca la actividad asociada
    if (updateEventoDto.Id_Actividad) {
      const actividad = await this.actividadRepo.findOne({
        where: { Id_actividad_pk: updateEventoDto.Id_Actividad },
      });
      if (!actividad) {
        throw new NotFoundException(`Actividad con id ${updateEventoDto.Id_Actividad} no encontrada`);
      }
      evento.actividad = actividad;
    }

    // Actualiza las propiedades del evento
    Object.assign(evento, updateEventoDto);

    // Guarda los cambios
    return await this.eventoRepo.save(evento);
  }


  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
