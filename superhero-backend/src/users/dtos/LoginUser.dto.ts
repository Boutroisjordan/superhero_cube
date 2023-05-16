import { ApiProperty } from "@nestjs/swagger";
import { IncidentForSuperherDto } from "src/incidents/dtos/IncidentForSuperhero.dto";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class LoginUserDto {

  @ApiProperty({ example: "email@email.com" })
  email: string;

  @ApiProperty({ example: "password" })
  password: string;

}