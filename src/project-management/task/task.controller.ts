import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import { CreateTaskUseCase } from './create-task/create-task.usecase';
import { CreateTaskDto } from './create-task/create-task.dto';
import { Task } from './task.schema';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskUseCase } from './update-task/update-task.usecase';
import { UpdateTaskDto } from './update-task/update-task.dto';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createTaskDto: CreateTaskDto, @Req() req): Promise<Task> {
    return this.createTaskUseCase.handle(createTaskDto, req.user);
  }

  @ApiOperation({ summary: 'Update a task by ID' })
  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateTaskDto,
    @Req() req,
  ): Promise<Task> {
    return this.updateTaskUseCase.handle(id, updateProjectDto, req.user);
  }
}
