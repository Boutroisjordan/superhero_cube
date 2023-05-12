import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createIncidentDto } from 'src/incidents/dtos/CreateIncident.dto';
import { updateIncidentDto } from 'src/incidents/dtos/UpdateIncident.dto';
import { IncidentsService } from 'src/incidents/services/incidents/incidents.service';

@ApiTags('incident')
@Controller('incidents')
export class IncidentsController {

  constructor(private incidentService: IncidentsService) {}

  @Get()
  async getIncidents() {
    const superheros = await this.incidentService.fetchSuperheros();
    return superheros;
  }

  @Post()
  createIncident(@Body() createSuperheroDto: createIncidentDto) {
    return this.incidentService.createSuperhero(createSuperheroDto);
  }

  @Put(':id') 
  async updateIncidentById(@Param('id', ParseIntPipe)id: number, @Body() updateSuperhero: updateIncidentDto) {
    await this.incidentService.updateSuperhero(id, updateSuperhero);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // this.incidentService.
    await this.incidentService.deleteSuperhero(id);

  }


}