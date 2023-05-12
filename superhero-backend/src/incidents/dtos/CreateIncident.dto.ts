import { ApiProperty } from "@nestjs/swagger";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class createIncidentDto {
  
  @ApiProperty({example: "Nom du incident"})
  name: string;

}