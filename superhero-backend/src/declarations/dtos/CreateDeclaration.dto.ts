import { ApiProperty } from "@nestjs/swagger";
import { Incident } from "src/typeorm/entities/Incident.entity";
import { IncidentForSuperherDto } from "./DeclarationForSuperhero.dto";
import { SuperheroByNameDto } from "src/superheros/dtos/SuperheroByName.Dto";
import { SuperheroByIdDto } from "src/superheros/dtos/SuperheroById.Dto";

export class createDeclarationDto {

  @ApiProperty({ example: "Titre de la déclaration" })
  name: string;

  @ApiProperty({ example: "Descriptif " })
  details: string;

  @ApiProperty({ example: 49.0241 })
  lat: number;

  @ApiProperty({ example: 1.1508 })
  lng: number;

  @ApiProperty({ example: [{ id: 1 }] })
  superheros: SuperheroByIdDto[];

  @ApiProperty({ example: { id: 1 } })
  incident: IncidentForSuperherDto;

}