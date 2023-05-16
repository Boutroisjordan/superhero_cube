import { ApiProperty } from "@nestjs/swagger";
import { IncidentForSuperherDto } from "src/incidents/dtos/IncidentForSuperhero.dto";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class CreateUserDto {

  @ApiProperty({ example: "Nom du User" })
  name: string;

  @ApiProperty({ example: "email@email.com" })
  email: string;

  @ApiProperty({ example: "password" })
  password: string;

  @ApiProperty({ example: 16282 })
  latitude: number;

  @ApiProperty({ example: 12382 })
  longitude: number;

  // @ApiProperty({ example: 1 })
  // roleId: number;

  // @ApiProperty({example: [{id: 1, name: "braquage"}]})
  // incidents: Incident[];


}