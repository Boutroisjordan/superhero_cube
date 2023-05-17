import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createDeclarationDto } from 'src/declarations/dtos/CreateDeclaration.dto';
import { updateDeclarationDto } from 'src/declarations/dtos/UpdateDeclaration.dto';
import { Declaration } from 'src/typeorm/entities/Declaration.entity';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { Superhero } from 'src/typeorm/entities/Superhero.entity';
import { Repository } from 'typeorm';

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
    console.log("incident bordel: ", incident, " ", declarationDetails.incident.id);

    for (const superheroDto of declarationDetails.superheros) {
      const superhero = await this.superheroRepository.findOneOrFail({
        where: {
          id: superheroDto.id,
        }
      })

      superheros.push(superhero);
      console.log("push hero: ", superhero)
      console.log("from request hero: ", declarationDetails.superheros)
    }

    const newDeclaration = this.declarationRepository.create({ ...declarationDetails, incident, superheros });
    return await this.declarationRepository.save(newDeclaration);
  }

  updateDeclaration(id: number, updateDeclarationDto: updateDeclarationDto) {
    return this.declarationRepository.update({ id }, { ...updateDeclarationDto });
  }

  async deleteDeclaration(id: number) {
    console.log("le delete id: ", id)

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
