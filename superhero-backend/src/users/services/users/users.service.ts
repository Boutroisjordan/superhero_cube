import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/roles/dtos/CreateRole.dto';
import { Role } from 'src/typeorm/entities/Role.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { InfosUserDto } from 'src/users/dtos/InfosUser.dto';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // jwtService: any;


  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {

  }

  async fetchUsers() {
    const users = await this.userRepository.find({ relations: ["role"] });
    return users;
  }

  async fetchUserInfos(token: string) {

    // console.log("token", token)

    const decodedToken = this.jwtService.verify(token); // Décode le jeton JWT
    const userId = decodedToken.id;

    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }



  async createUser(userDetails: CreateUserDto) {

    const role = await this.roleRepository.findOne({ where: { id: 1 } });

    const newUser = this.userRepository.create({ ...userDetails, role });
    // console.log("User created")
    return await this.userRepository.save(newUser);
  }


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
