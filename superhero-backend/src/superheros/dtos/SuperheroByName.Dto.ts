import { ApiProperty } from "@nestjs/swagger";
import { IncidentForSuperherDto } from "src/incidents/dtos/IncidentForSuperhero.dto";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class SuperheroByNameDto {
  @ApiProperty({example: "Nom du superhéro"})
  name: string;
  
}