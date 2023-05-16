import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Incident } from "./Incident.entity";
import { Declaration } from "./Declaration.entity";
import { User } from "./User.entity";

@Entity({ name: "roles" })

export class Role {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

}