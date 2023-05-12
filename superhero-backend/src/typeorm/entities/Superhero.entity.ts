import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./Incident.entity";

@Entity({ name: "superheros"})

export class Superhero {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Column({ unique: true})
  name: string;

  @Column({ unique: true})
  phone: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;


  // @ManyToMany(() => Incident)
  // @JoinTable()
  // Incidents: Incident[]

  @ManyToMany(() => Incident, incident => incident.superheros)
  incidents: Incident[];

  // @ManyToMany(
  //   () => Incident, 
  //   (incident) => incident.superheros, //optional
  //   {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
  //   @JoinTable({@
  //     name: 'superhero_incident',
  //     joinColumn: {
  //       name: 'superhero_id',
  //       referencedColumnName: 'id',
  //     },
  //     inverseJoinColumn: {
  //       name: 'incident_id',
  //       referencedColumnName: 'id',
  //     },
  //   })
  //   incidents?: Incident[];

}