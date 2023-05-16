import { ApiProperty } from "@nestjs/swagger";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class IncidentForSuperherDto {
  
  @ApiProperty({example: "Nom de l'incident"})
  name: string;

}