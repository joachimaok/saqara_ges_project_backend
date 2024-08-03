import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateTaskCommand } from './create-task/create-task.command';
import { CreateTaskDto } from './create-task/create-task.dto';
import { Task } from './task.schema';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(private readonly createTaskCommand: CreateTaskCommand) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.createTaskCommand.handle(createTaskDto);
  }
}
