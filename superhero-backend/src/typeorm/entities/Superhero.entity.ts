import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./Incident.entity";
import { Declaration } from "./Declaration.entity";

@Entity({ name: "superheros" })

export class Superhero {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @ManyToMany(() => Incident, incident => incident.superheros)
  @JoinTable()
  incidents: Incident[];

  @ManyToMany(() => Declaration, declaration => declaration.superheros)
  // @JoinTable()
  declarations: Declaration[];

}