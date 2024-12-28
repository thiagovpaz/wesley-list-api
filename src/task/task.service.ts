import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const data = {
      ...createTaskDto,
      userId: userId,
    };

    const createdTask = await this.prisma.task.create({ data });
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

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found or does not belong to the user`);
    }

    return task;
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found or does not belong to the user`);
    }

    const updatedTask = await this.prisma.task.update({
      where: { id: id },
      data: updateTaskDto,
    });

    return updatedTask;
  }

  async remove(id: number, userId: number) {
    const existingTask = await this.prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found or does not belong to the user`);
    }

    await this.prisma.task.delete({
      where: { id: id },
    });

    return { message: `Task with ID ${id} has been successfully deleted` };
  }
}
