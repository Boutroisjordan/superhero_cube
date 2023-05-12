import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './typeorm/entities/Superhero.entity';
import { SuperherosModule } from './superheros/superheros.module';
import { IncidentsModule } from './incidents/incidents.module';
import { Incident } from './typeorm/entities/Incident.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "root",
    database: "cube_superhero",
    entities: [Superhero, Incident],
    synchronize: true,
  }), SuperherosModule, IncidentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
