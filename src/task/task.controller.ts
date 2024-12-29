import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User) {
    return this.taskService.create(createTaskDto, user.id);
  }

  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.taskService.findAll(user.id, Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.taskService.findOne(+id, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @CurrentUser() user: User, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, user.id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.taskService.remove(+id, user.id);
  }
}
