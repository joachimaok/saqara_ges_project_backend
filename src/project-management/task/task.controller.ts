import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateTaskUseCase } from './create-task/create-task.usecase';
import { CreateTaskDto } from './create-task/create-task.dto';
import { Task } from './task.schema';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.createTaskUseCase.handle(createTaskDto);
  }
}
