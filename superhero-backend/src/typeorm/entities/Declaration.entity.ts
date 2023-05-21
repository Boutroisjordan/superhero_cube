import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Superhero } from "./Superhero.entity";
import { Incident } from "./Incident.entity";

@Entity({ name: "declarations" })

export class Declaration {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  details: string;

  @Column({ type: "float" })
  lat: number;

  @Column({ type: "float" })
  lng: number;


  @ManyToOne(() => Incident, incident => incident.declarations, { onDelete: "NO ACTION" })
  @JoinTable()
  incident: Incident | null;

  @ManyToMany(() => Superhero, superhero => superhero.declarations, { cascade: true })
  @JoinTable()
  superheros: Superhero[] | null;

}