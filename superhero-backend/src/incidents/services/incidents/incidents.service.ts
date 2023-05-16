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

  fetchIncidents() {
    return this.incidentRepository.find();
  }

  createIncident(incidentDetails: createIncidentDto) {
    const newIncident = this.incidentRepository.create({...incidentDetails});
    return this.incidentRepository.save(newIncident);
  }

  updateIncident(id: number, updateIncidentDto: updateIncidentDto) {
    return this.incidentRepository.update({id}, {...updateIncidentDto});
  }

  deleteIncident(id: number) {
    return this.incidentRepository.delete(id);
  }

}
