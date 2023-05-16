import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { Role } from 'src/typeorm/entities/Role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
    RouterModule.register([
      {
        path: 'user'
      }
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
