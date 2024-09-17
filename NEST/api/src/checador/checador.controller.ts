import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChecadorService } from './checador.service';
import { CreateChecadorDto } from './dto/create-checador.dto';
import { UpdateChecadorDto } from './dto/update-checador.dto';

@Controller('checador')
export class ChecadorController {
  constructor(private readonly checadorService: ChecadorService) {}

  @Post()
  create(@Body() createChecadorDto: CreateChecadorDto) {
    return this.checadorService.create(createChecadorDto);
  }

  @Get()
  findAll() {
    return this.checadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecadorDto: UpdateChecadorDto) {
    return this.checadorService.update(+id, updateChecadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checadorService.remove(+id);
  }
}
