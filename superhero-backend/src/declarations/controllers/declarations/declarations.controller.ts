import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createDeclarationDto } from 'src/declarations/dtos/CreateDeclaration.dto';
import { updateDeclarationDto } from 'src/declarations/dtos/UpdateDeclaration.dto';
import { DeclarationsService } from 'src/declarations/services/declarations/declarations.service';

@ApiTags('declaration')
@Controller('declarations')
export class DeclarationsController {


  constructor(private declarationService: DeclarationsService) {}

  @Get()
  async getIncidents() {
    const superheros = await this.declarationService.fetchDeclarations();
    return superheros;
  }

  @Post()
  createIncident(@Body() createSuperheroDto: createDeclarationDto) {
    return this.declarationService.createDeclaration(createSuperheroDto);
  }

  @Put(':id') 
  async updateIncidentById(@Param('id', ParseIntPipe)id: number, @Body() updateSuperhero: updateDeclarationDto) {
    await this.declarationService.updateDeclaration(id, updateSuperhero);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // this.declarationService.
    await this.declarationService.deleteDeclaration(id);

  }
}
