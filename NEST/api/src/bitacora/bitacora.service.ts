import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { UpdateBitacoraDto } from './dto/update-bitacora.dto';
import { Usuario } from 'src/entities/usuarios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bitacora } from 'src/schemas/bitacora/bitacora.schema';

@Injectable()
export class BitacoraService {

  constructor(
    @InjectModel(Bitacora.name, 'sicat_nest')  private readonly bitacoraModel: Model<Bitacora>,
    @InjectRepository(Usuario) private readonly usuariosRepository: Repository<Usuario>,
  ){
  }

  async create(createBitacoraDto: CreateBitacoraDto) {
    const {id_usuario, bitacora_detalle} = createBitacoraDto;
    const user = await this.usuariosRepository.findOneBy({Id_usuario_pk:id_usuario});

    if(!user) throw new NotFoundException(`El usuario no existe en la base de datos`);

    let bitacora = await this.bitacoraModel.findOne({ id_usuario });

    if(bitacora){
      bitacora.bitacora_detalle.push(...bitacora_detalle);
    }else{
      bitacora = new this.bitacoraModel({id_usuario,bitacora_detalle});
    }

    await bitacora.save();

    return {success:true,message:`Se creo una entrada en la bitacora con exito`};
  }

  async findAll() {
    return await this.bitacoraModel.find();
  }

  async findOne(id: number) {
    const bitacoras = await this.bitacoraModel.find({id_usuario:id});

    if(!bitacoras || bitacoras.length === 0 ) throw new NotFoundException(`El usuario no existe en la base de datos`);

    return bitacoras;
  }

  update(id: number, updateBitacoraDto: UpdateBitacoraDto) {
    return `This action updates a #${id} bitacora`;
  }

  remove(id: number) {
    return `This action removes a #${id} bitacora`;
  }
}
