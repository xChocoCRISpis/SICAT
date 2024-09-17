import { Injectable } from '@nestjs/common';
import { CreateChecadorDto } from './dto/create-checador.dto';
import { UpdateChecadorDto } from './dto/update-checador.dto';
import { Checador } from 'src/schemas/checador/checador.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChecadorService {

  constructor(
    @InjectModel(Checador.name, 'sicat_nest')  private readonly bitacoraModel: Model<Checador>,
  ){}
  create(createChecadorDto: CreateChecadorDto) {
    return 'This action adds a new checador';
  }

  findAll() {
    return `This action returns all checador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checador`;
  }

  update(id: number, updateChecadorDto: UpdateChecadorDto) {
    return `This action updates a #${id} checador`;
  }

  remove(id: number) {
    return `This action removes a #${id} checador`;
  }
}
