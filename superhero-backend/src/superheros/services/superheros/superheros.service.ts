import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSuperheroDto } from 'src/superheros/dtos/CreateSuperhero.dto';
import { updateSuperheroDto } from 'src/superheros/dtos/UpdateSuperhero.dto';
import { Superhero } from 'src/typeorm/entities/Superhero.entity';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { In, Repository } from 'typeorm';
import { calculateDistance } from 'src/utils/calculateDistance';
import { createDeclarationDto } from 'src/declarations/dtos/CreateDeclaration.dto';
import { Declaration } from 'src/typeorm/entities/Declaration.entity';

@Injectable()
export class SuperherosService {

  constructor(
    @InjectRepository(Superhero) private superheroRepository: Repository<Superhero>,
    @InjectRepository(Incident) private incidentRepository: Repository<Incident>,
    @InjectRepository(Declaration) private declarationRepository: Repository<Declaration>,
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

  async fetchNearestSuperheros(id: number) {

    const declaration = await this.declarationRepository.findOne({
      where: {
        id: id,
      },
      relations: ["incident"]
    });
    const nearestSuperheros = await this.superheroRepository.find({ relations: ["incidents"] });
    const superherosArray = [];

    for (const superhero of nearestSuperheros) {

      const distance = calculateDistance(superhero.latitude, superhero.longitude, declaration.lat, declaration.lng);
      console.log("superhero nearest: ", distance, " name: ", superhero.name, " ", distance < 0)

      console.log(distance);
      if (distance < 50) {
        // superherosArray.push(superhero);
        const hasIncidentWithName = superhero.incidents.some((incident: Incident) => incident.name === 'braquage');
        if (hasIncidentWithName) superherosArray.push({ "superhero": superhero, "distance": Math.round(distance) });
      }

    }

    return superherosArray;
  }
}
