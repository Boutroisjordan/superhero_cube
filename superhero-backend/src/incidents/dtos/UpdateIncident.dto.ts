import { ApiProperty } from "@nestjs/swagger";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class updateIncidentDto {
  
  @ApiProperty({example: "Nom de l'incident"})
  name: string;

  @ApiProperty({ example: "Nom complet" })
  realName: string;

}