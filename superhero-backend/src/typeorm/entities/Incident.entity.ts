import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Superhero } from "./Superhero.entity";
import { Declaration } from "./Declaration.entity";

@Entity({ name: "incidents"})

export class Incident {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Column({ unique: true})
  name: string;

  @ManyToMany(() => Superhero, superhero => superhero.incidents)
  @JoinTable()
  superheros: Superhero[];

  @OneToMany(() => Declaration, declaration => declaration.incident, {onDelete: 'NO ACTION'})
  @JoinTable()
  declarations: Declaration[];

  // @ManyToMany(
  //   () => Superhero,
  //   superhero => superhero.incidents,
  //   {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
  // )
  // superheros?: Superhero[];

}