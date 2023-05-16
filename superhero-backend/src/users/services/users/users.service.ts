import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/roles/dtos/CreateRole.dto';
import { Role } from 'src/typeorm/entities/Role.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {

  }

  async fetchUsers() {
    const users = await this.userRepository.find({ relations: ["role"] });
    return users;
  }

  // async createUser(userDetails: CreateUserDto): Promise<User> {
  //   const newUser = this.userRepository.create({ ...userDetails });
  //   this.userRepository.save(newUser);
  //   return newUser;
  // }

  async createUser(userDetails: CreateUserDto) {

    const role = await this.roleRepository.findOne({ where: { id: 1 } });

    const newUser = this.userRepository.create({ ...userDetails, role });
    console.log("User created")
    return await this.userRepository.save(newUser);
  }
  // async createSuperhero(superheroDetails: createSuperheroDto) {
  //   const incidents: Incident[] = [];

  //   for (const incidentDto of superheroDetails.incidents) {
  //     const incident = await this.incidentRepository.findOneBy({ name: incidentDto.name });
  //     incidents.push(incident);
  //   }

  //   const newSuperhero = this.superheroRepository.create({ ...superheroDetails, incidents });
  //   return this.superheroRepository.save(newSuperhero);
  // }

  async findUser(userCredentials: LoginUserDto): Promise<User> {
    const findingUser = await this.userRepository.findOne({
      where: {
        email: userCredentials.email
      },
      relations: ["role"]
    });
    // const findUser = await this.userRepository.findOne();

    // const declaration = await this.declarationRepository.findOne({
    //   where: {
    //     id: id
    //   }
    // });
    return findingUser;
  }
}
