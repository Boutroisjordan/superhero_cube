import { ApiProperty } from "@nestjs/swagger";
import { IncidentForSuperherDto } from "src/incidents/dtos/IncidentForSuperhero.dto";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class createSuperheroDto {
  @ApiProperty({example: "Nom du superhéro"})
  name: string;

  @ApiProperty({example: "0676896124"})
  phone: string;

  @ApiProperty({example: 16282})
  latitude: number;

  @ApiProperty({example: 12382})
  longitude: number;

  // @ApiProperty({example: [{id: 1, name: "braquage"}]})
  // incidents: Incident[];

  @ApiProperty({example: [{name: "braquage"}]})
  incidents: IncidentForSuperherDto[];
  
}