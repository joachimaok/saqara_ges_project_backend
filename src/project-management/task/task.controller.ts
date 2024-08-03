import { Controller, Post, Body } from '@nestjs/common';
import { CreateTaskCommand } from './create-task/create-task.command';
import { CreateTaskDto } from './create-task/create-task.dto';
import { Task } from './task.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskCommand: CreateTaskCommand) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.createTaskCommand.handle(createTaskDto);
  }
}
