import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Role.entity';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    RouterModule.register([
      {
        path: 'role'
      }
    ])
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule { }
