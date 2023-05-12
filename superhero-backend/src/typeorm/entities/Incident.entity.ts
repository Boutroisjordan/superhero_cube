import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Superhero } from "./Superhero.entity";

@Entity({ name: "incidents"})

export class Incident {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Column({ unique: true})
  name: string;

  @ManyToMany(() => Superhero, superhero => superhero.incidents)
  @JoinTable()
  superheros: Superhero[];

  // @ManyToMany(
  //   () => Superhero,
  //   superhero => superhero.incidents,
  //   {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  // )
  // superheros?: Superhero[];

}