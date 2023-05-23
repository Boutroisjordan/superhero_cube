import { ApiProperty } from "@nestjs/swagger";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class createIncidentDto {
  
  @ApiProperty({ example: "Nom" })
  name: string;

  @ApiProperty({ example: "Nom complet" })
  realName: string;

}