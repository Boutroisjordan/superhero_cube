import { ApiProperty } from "@nestjs/swagger";
import { IncidentForSuperherDto } from "src/incidents/dtos/IncidentForSuperhero.dto";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class UserByNameDto {
  @ApiProperty({ example: "Nom de l'user" })
  name: string;

}