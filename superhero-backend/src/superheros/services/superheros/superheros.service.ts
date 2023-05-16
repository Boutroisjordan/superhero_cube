import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSuperheroDto } from 'src/superheros/dtos/CreateSuperhero.dto';
import { updateSuperheroDto } from 'src/superheros/dtos/UpdateSuperhero.dto';
import { Superhero } from 'src/typeorm/entities/Superhero.entity';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SuperherosService {

  constructor(
    @InjectRepository(Superhero) private superheroRepository: Repository<Superhero>,
    @InjectRepository(Incident) private incidentRepository: Repository<Incident>,
    ) {

  }

  fetchSuperheros() {
    return this.superheroRepository.createQueryBuilder('superhero')
    .leftJoinAndSelect('superhero.incidents', 'incident')
    .getMany();
  }

  async createSuperhero(superheroDetails: createSuperheroDto) {
    const incidents: Incident[] = [];

    for (const incidentDto of superheroDetails.incidents) {
      const incident = await this.incidentRepository.findOneBy({ name: incidentDto.name });
      incidents.push(incident);
    }
  
    const newSuperhero = this.superheroRepository.create({ ...superheroDetails, incidents });
    return this.superheroRepository.save(newSuperhero);
  }

  async updateSuperhero(id: number, updateSuperheroDto: updateSuperheroDto) {
    const superhero = await this.superheroRepository.createQueryBuilder('superhero')
    .leftJoinAndSelect('superhero.incidents', 'incident')
    .where('superhero.id = :id', { id })
    .getOne();

    superhero.name = updateSuperheroDto.name;
    superhero.phone = updateSuperheroDto.phone;
    superhero.latitude = updateSuperheroDto.latitude;
    superhero.longitude = updateSuperheroDto.longitude;

    if (updateSuperheroDto.incidents && updateSuperheroDto.incidents.length > 0) {
      const incidentNames = updateSuperheroDto.incidents.map(incident => incident.name);
      const incidents = await this.incidentRepository.find({
        where: { name: In(incidentNames) },
      });
      superhero.incidents = incidents;
    } else {
      superhero.incidents = [];
    }

    await this.superheroRepository.save(superhero);

    return superhero;
  }


  deleteSuperhero(id: number) {
    return this.superheroRepository.delete(id);
  }
}
