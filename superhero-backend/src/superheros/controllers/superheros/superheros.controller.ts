import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {ApiParam, ApiTags } from '@nestjs/swagger';
import { createDeclarationDto } from 'src/declarations/dtos/CreateDeclaration.dto';
import { createSuperheroDto } from 'src/superheros/dtos/CreateSuperhero.dto';
import { updateSuperheroDto } from 'src/superheros/dtos/UpdateSuperhero.dto';
import { SuperherosService } from 'src/superheros/services/superheros/superheros.service';

@ApiTags('superhero')
@Controller('superheros')
export class SuperherosController {

  constructor(private superheroService: SuperherosService) {}

  @Get()
  async getSuperheros() {
    const superheros = await this.superheroService.fetchSuperheros();
    return superheros;
  }
  @Get("/nearest/:id")
  async getNearestSuperheros(@Param('id', ParseIntPipe) id: number) {
    const superheros = await this.superheroService.fetchNearestSuperheros(id);
    return superheros;
  }

  @Post()
  createSuperhero(@Body() createSuperheroDto: createSuperheroDto) {
    return this.superheroService.createSuperhero(createSuperheroDto);
  }

  @Put(':id') 
  async updateSuperheroById(@Param('id', ParseIntPipe)id: number, @Body() updateSuperhero: updateSuperheroDto) {
    await this.superheroService.updateSuperhero(id, updateSuperhero);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // this.superheroService.
    await this.superheroService.deleteSuperhero(id);

  }


}

