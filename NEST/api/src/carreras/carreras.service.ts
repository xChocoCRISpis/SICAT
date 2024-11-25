import { Injectable } from "@nestjs/common";
import { CreateCarreraDto } from "./dto/create-carrera.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Carrera } from "../entities/carreras.entity";
import { Repository } from "typeorm";

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>
  ) {}

  findAll() {
    return this.carreraRepository.find();
  }
}
