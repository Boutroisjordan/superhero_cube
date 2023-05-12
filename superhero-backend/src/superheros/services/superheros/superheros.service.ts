import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSuperheroDto } from 'src/superheros/dtos/CreateSuperhero.dto';
import { updateSuperheroDto } from 'src/superheros/dtos/UpdateSuperhero.dto';
import { Superhero } from 'src/typeorm/entities/Superhero.entity';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperherosService {

  constructor(
    @InjectRepository(Superhero) private superheroRepository: Repository<Superhero>,
    @InjectRepository(Incident) private incidentRepository: Repository<Incident>,
    ) {

  }

  fetchSuperheros() {
    // return this.superheroRepository.find();
    return this.superheroRepository.createQueryBuilder('superhero')
    .leftJoinAndSelect('superhero.incidents', 'incident')
    .getMany();
  }

  async createSuperhero(superheroDetails: createSuperheroDto) {
    // const newSuperhero = this.superheroRepository.create({...superheroDetails});

    // return this.superheroRepository.save(newSuperhero);

    const incidents: Incident[] = [];

    for (const incidentDto of superheroDetails.incidents) {
      const incident = await this.incidentRepository.findOneBy({ name: incidentDto.name });
      incidents.push(incident);
    }
  
    const newSuperhero = this.superheroRepository.create({ ...superheroDetails, incidents });
    return this.superheroRepository.save(newSuperhero);
  }

  updateSuperhero(id: number, updateSuperheroDto: updateSuperheroDto) {
    return this.superheroRepository.update({id}, {...updateSuperheroDto});
    // const newSuperhero = this.superheroRepository.upsert({...superheroDetails});
    // return this.superheroRepository.save(newSuperhero);
  }

  deleteSuperhero(id: number) {
    return this.superheroRepository.delete(id);
  }
}
