import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const data = {
      ...createTaskDto,
      userId: userId,
    };

    const createdTask = await this.prisma.task.create({ data });
    console.log('data', createdTask);
    return createdTask;
  }

  async findAll(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
