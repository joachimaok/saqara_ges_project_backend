import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTaskUseCase } from './create-task/create-task.usecase';
import { CreateTaskDto } from './create-task/create-task.dto';
import { Task } from './task.schema';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskUseCase } from './update-task/update-task.usecase';
import { UpdateTaskDto } from './update-task/update-task.dto';
import { DeleteTaskUseCase } from './delete-task/delete-task.usecase';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
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

  @ApiOperation({ summary: 'Delete a task by ID' })
  @UseGuards(AuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req): Promise<void> {
    await this.deleteTaskUseCase.handle(id, req.user);
  }
}
