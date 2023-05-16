import { Module } from '@nestjs/common';
import { DeclarationsController } from './controllers/declarations/declarations.controller';
import { DeclarationsService } from './services/declarations/declarations.service';
import { Declaration } from 'src/typeorm/entities/Declaration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { Superhero } from 'src/typeorm/entities/Superhero.entity';
import { Incident } from 'src/typeorm/entities/Incident.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Declaration]),
    TypeOrmModule.forFeature([Superhero]),
    TypeOrmModule.forFeature([Incident]),
    RouterModule.register([
      {
        path: 'declaration'
      }
    ])
  ],
  controllers: [DeclarationsController],
  providers: [DeclarationsService]
})
export class DeclarationsModule {}
