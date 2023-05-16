import { ApiProperty } from "@nestjs/swagger";
import { Incident } from "src/typeorm/entities/Incident.entity";
import { IncidentForSuperherDto } from "./DeclarationForSuperhero.dto";
import { SuperheroByNameDto } from "src/superheros/dtos/SuperheroByName.Dto";
import { SuperheroByIdDto } from "src/superheros/dtos/SuperheroById.Dto";

export class createDeclarationDto {

  @ApiProperty({example: "Titre de la déclaration"})
  name: string;

  @ApiProperty({example: "Descriptif "})
  details: string;

  @ApiProperty({example: 12382})
  latitude: number;

  @ApiProperty({example: 12382})
  longitude: number;

  @ApiProperty({example: [{id: 1}]})
  superheros: SuperheroByIdDto[];

  @ApiProperty({example: {name: "braquage"}})
  incident: IncidentForSuperherDto;

}