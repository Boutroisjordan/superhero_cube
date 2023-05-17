import { ApiProperty } from "@nestjs/swagger";
import { Incident } from "src/typeorm/entities/Incident.entity";

export class IncidentForSuperherDto {

  @ApiProperty({ example: "1" })
  id: number;

}