import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    }

    const userCreated = await this.prisma.user.create({ data })
    return {
      ...userCreated,
      password: undefined
    };
  }

  findByEmail(id: number) {
    return `This action returns a #${id} user`;
  }
}
