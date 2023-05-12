import { Module } from '@nestjs/common';
import { IncidentsController } from './controllers/incidents/incidents.controller';
import { IncidentsService } from './services/incidents/incidents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incident]),
    RouterModule.register([
      {
        path: 'superhero'
      }
    ])
  ],
  
  controllers: [IncidentsController],
  providers: [IncidentsService]
})

export class IncidentsModule {}
