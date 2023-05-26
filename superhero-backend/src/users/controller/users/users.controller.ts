import { BadRequestException, Body, Controller, Get, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersGuard } from 'src/users/guards/users/users.guard';
import { InfosUserDto } from 'src/users/dtos/InfosUser.dto';
import { Request } from 'express';


@ApiTags('user')
@Controller('users')
export class UsersController {


  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  @Get()
  @ApiBearerAuth()
  @UseGuards(UsersGuard)
  @SetMetadata('role', ["admin", "customer"])
  async get() {
    const users = await this.userService.fetchUsers();
    return users;
  }
  @ApiBearerAuth()
  // @UseGuards(UsersGuard)
  @Get("/infos")
  async getUserInfos(@Req() request: Request) {

    const token = request.headers.authorization.replace('bearer ', '')

    // console.log("token controller: ", token)
    const users = await this.userService.fetchUserInfos(token);
    return users;
  }

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12)
    createUserDto.password = hashedPassword;

    return await this.userService.createUser(createUserDto);
  }

  @Post("/login")
  async Login(
    @Body() userCredsDto: LoginUserDto,
    // @Res({ passthrough: true }) response: Response
  ) {
    // console.log("user reçu: ", userCredsDto);
    const user = await this.userService.findUser(userCredsDto);

    if (!user) {
      throw new BadRequestException("invalid credentials");
    }

    if (!await bcrypt.compare(userCredsDto.password, user.password)) {
      throw new BadRequestException("invalid credentials");
    }

    const jwt = await this.jwtService.signAsync({ id: user.id, role: user.role.name })


    return {
      message: "success",
      jwt,
      username: user.name
    };
  }
}
