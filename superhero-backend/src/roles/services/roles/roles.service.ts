import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/roles/dtos/CreateRole.dto';
import { UpdateRoleDto } from 'src/roles/dtos/UpdateRole.dto';
import { Role } from 'src/typeorm/entities/Role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {

  }

  fetchRoles() {
    return this.roleRepository.find();
  }

  async createRole(roleDetails: CreateRoleDto): Promise<Role> {

    const nameToLowerCase = roleDetails.name.toLowerCase();
    roleDetails.name = nameToLowerCase;
    const newRole = this.roleRepository.create({ ...roleDetails });
    this.roleRepository.save(newRole);
    return newRole;
  }

  async findRole(roleDetails: CreateRoleDto) {

    const nameLowerCase = roleDetails.name.toLowerCase();
    const role = this.roleRepository.findOne({
      where: {
        name: nameLowerCase
      }
    });

    return role;
  }

  async updateRole(id: number, roleDetails: UpdateRoleDto) {

    //find the role
    //Update name
    //Save

    const nameLowerCase = roleDetails.name.toLowerCase();
    var findRole = await this.roleRepository.findOne({
      where: {
        id: id
      }
    });

    if (findRole) {
      findRole.name = nameLowerCase;
    }
    this.roleRepository.save(findRole);

    return findRole;
  }

  deleteRole(id: number) {
    return this.roleRepository.delete(id);
  }




}
