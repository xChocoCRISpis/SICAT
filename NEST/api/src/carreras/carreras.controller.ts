import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CarrerasService } from "./carreras.service";
import { CreateCarreraDto } from "./dto/create-carrera.dto";

@Controller("carreras")
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }
}
