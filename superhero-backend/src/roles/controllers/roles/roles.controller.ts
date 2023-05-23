import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/roles/dtos/CreateRole.dto';
import { UpdateRoleDto } from 'src/roles/dtos/UpdateRole.dto';
import { RolesService } from 'src/roles/services/roles/roles.service';

@ApiTags('role')
@Controller('roles')
export class RolesController {

  constructor(
    private roleService: RolesService,
  ) { }

  @Get()
  async get() {
    const users = await this.roleService.fetchRoles();
    return users;
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {

    const findDoublons = await this.roleService.findRole(createRoleDto);

    if (findDoublons) {
      throw new BadRequestException('Role already exist !')
    }

    return await this.roleService.createRole(createRoleDto);
  }

  @Put(':id')
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() updateRole: UpdateRoleDto) {

    const findDoublons = await this.roleService.findRole(updateRole);

    if (findDoublons) {
      throw new BadRequestException('Role name already taken !')
    }

    return await this.roleService.updateRole(id, updateRole);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // this.superheroService.
    await this.roleService.deleteRole(id);
  }
}
