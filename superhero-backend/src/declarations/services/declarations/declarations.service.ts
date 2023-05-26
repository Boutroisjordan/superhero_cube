import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createDeclarationDto } from 'src/declarations/dtos/CreateDeclaration.dto';
import { updateDeclarationDto } from 'src/declarations/dtos/UpdateDeclaration.dto';
import { Declaration } from 'src/typeorm/entities/Declaration.entity';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { Superhero } from 'src/typeorm/entities/Superhero.entity';
import { Repository } from 'typeorm';
import { calculateDistance } from "../../../utils/calculateDistance";


@Injectable()
export class DeclarationsService {

  constructor(
    @InjectRepository(Declaration) private declarationRepository: Repository<Declaration>,
    @InjectRepository(Superhero) private superheroRepository: Repository<Superhero>,
    @InjectRepository(Incident) private incidentRepository: Repository<Incident>,
  ) { }

  fetchDeclarations() {
    return this.declarationRepository.createQueryBuilder('declaration')
      .leftJoinAndSelect('declaration.incident', 'incident')
      .leftJoinAndSelect('declaration.superheros', 'superhero')
      .getMany();
  }

  async createDeclaration(declarationDetails: createDeclarationDto) {

    var incident: Incident;
    const superheros: Superhero[] = [];


    const incidentDto = await this.incidentRepository.findOne({
      where: {
        id: declarationDetails.incident.id
      }
    });
    incident = incidentDto;

    if (declarationDetails.superheros) {

      for (const superheroDto of declarationDetails.superheros) {
        const superhero = await this.superheroRepository.findOneOrFail({
          where: {
            id: superheroDto.id,
          }
        })

        superheros.push(superhero);
      }
    }



    const start = {
      latitude: 49.0270129,
      longitude: 1.151361
    }

    const end = {
      latitude: 49.1,
      longitude: 1.1167
    }


    const nearestSuperheros = await this.superheroRepository.find({ relations: ["incidents"] });
    const superherosArray = [];

    for (const superhero of nearestSuperheros) {

      const distance = calculateDistance(superhero.latitude, superhero.longitude, declarationDetails.lat, declarationDetails.lng);



      if (distance < 50) {
        // superherosArray.push(superhero);
        const hasIncidentWithName = superhero.incidents.some((incident: Incident) => incident.name === 'braquage');
        if (hasIncidentWithName) superherosArray.push({ "superhero": superhero, "distance": Math.round(distance) });
      }

    }



    const newDeclaration = this.declarationRepository.create({ ...declarationDetails, incident, superheros });
    // return newDeclaration;
    await this.declarationRepository.save(newDeclaration);
    return {
      "declaration": newDeclaration,
      "nearestSuperheros": superherosArray
    }
  }

  async updateDeclaration(id: number, updateDeclarationDto: updateDeclarationDto) {
    const findDeclaration = await this.declarationRepository.findOne({ where: { id: id }, relations: ["incident", "superheros"] });


    if (!findDeclaration) {
      throw new Error("introuvable");
    }

    var incident: Incident;
    const superheros: Superhero[] = [];

    // console.log("OG: ", findDeclaration)
    // console.log("l'update: ", updateDeclarationDto)
    // console.log("l'incident: ", updateDeclarationDto.incident)

    const incidentDto = await this.incidentRepository.findOne({
      where: {
        id: updateDeclarationDto.incident.id
      }
    });

    if (findDeclaration.incident.id === updateDeclarationDto.incident.id) {
      findDeclaration.incident = incidentDto;


    }



    // console.log("l'incident after: ", incidentDto)


    if (updateDeclarationDto.superheros != undefined) {

      if (updateDeclarationDto.superheros.length > 0) {

        for (const superheroDto of updateDeclarationDto.superheros) {
          const superhero = await this.superheroRepository.findOneOrFail({
            where: {
              id: superheroDto.id,
            }
          })

          if (findDeclaration.superheros.some((item) => item.id != superhero.id)) {

        superheros.push(superhero);
      }
    }
      }
    }
    if (updateDeclarationDto.details) findDeclaration.details = updateDeclarationDto.details;
    findDeclaration.lat = updateDeclarationDto.lat;
    findDeclaration.lng = updateDeclarationDto.lng;
    findDeclaration.name = updateDeclarationDto.name;
    findDeclaration.superheros = superheros;


    return await this.declarationRepository.save(findDeclaration);
  }

  async deleteDeclaration(id: number) {


    const declaration = await this.declarationRepository.findOne({
      where: {
        id: id
      }
    });

    if (declaration.superheros != null) {

      declaration.superheros = []; // Supprime tous les liens avec les superhéros
    }
    declaration.incident = null; // Supprime tous les liens avec les superhéros

    // Ou, si vous voulez supprimer des liens spécifiques :
    // declaration.superheros.splice(index, 1); // Supprime un lien spécifique

    await this.declarationRepository.save(declaration);

    await this.declarationRepository.delete(id);
    // return this.declarationRepository.delete(id);
  }
}
