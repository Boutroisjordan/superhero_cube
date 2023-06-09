import { Module } from '@nestjs/common';
import { SuperherosController } from './controllers/superheros/superheros.controller';
import { SuperherosService } from './services/superheros/superheros.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from 'src/typeorm/entities/Superhero.entity';
import { RouterModule } from '@nestjs/core';
import { Incident } from 'src/typeorm/entities/Incident.entity';
import { Declaration } from 'src/typeorm/entities/Declaration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Superhero]),
    TypeOrmModule.forFeature([Incident]),
    TypeOrmModule.forFeature([Declaration]),
    RouterModule.register([
      {
        path: 'superhero'
      }
    ])
  ],
  
  controllers: [SuperherosController],
  providers: [SuperherosService]
})
export class SuperherosModule {}
