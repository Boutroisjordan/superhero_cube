import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./Incident.entity";
import { Declaration } from "./Declaration.entity";
import { Role } from "./Role.entity";

@Entity({ name: "users" })

export class User {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @ManyToOne(() => Role, role => role.users)
  role: Role;


  // @ManyToMany(() => Declaration, declaration => declaration.mairies)
  // // @JoinTable()
  // declarations: Declaration[];

}