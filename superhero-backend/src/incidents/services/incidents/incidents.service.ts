import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createIncidentDto } from 'src/incidents/dtos/CreateIncident.dto';
import { updateIncidentDto } from 'src/incidents/dtos/UpdateIncident.dto';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentsService {

  constructor(@InjectRepository(Incident) private incidentRepository: Repository<Incident>) {

  }

  fetchSuperheros() {
    return this.incidentRepository.find();
  }

  createSuperhero(incidentDetails: createIncidentDto) {
    const newSuperhero = this.incidentRepository.create({...incidentDetails});
    return this.incidentRepository.save(newSuperhero);
  }

  updateSuperhero(id: number, updateIncidentDto: updateIncidentDto) {
    return this.incidentRepository.update({id}, {...updateIncidentDto});
  }

  deleteSuperhero(id: number) {
    return this.incidentRepository.delete(id);
  }
  
}
