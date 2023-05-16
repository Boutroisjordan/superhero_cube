import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './typeorm/entities/Superhero.entity';
import { SuperherosModule } from './superheros/superheros.module';
import { IncidentsModule } from './incidents/incidents.module';
import { Incident } from './typeorm/entities/Incident.entity';
import { DeclarationsModule } from './declarations/declarations.module';
import { Declaration } from './typeorm/entities/Declaration.entity';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User.entity';
import { Role } from './typeorm/entities/Role.entity';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "root",
    database: "superhero",
    entities: [Superhero, Incident, Declaration, User, Role],
    synchronize: true,
  }), SuperherosModule, IncidentsModule, DeclarationsModule, UsersModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
