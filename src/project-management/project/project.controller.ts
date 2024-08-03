import { Controller, Post, Body } from '@nestjs/common';
import { CreateProjectCommand } from './create-project/create-project.command';
import { Project } from './project.schema';
import { CreateProjectDto } from './create-project/create-project.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly createProjectCommand: CreateProjectCommand) {}

  @ApiOperation({ summary: 'Create a new project' })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.createProjectCommand.handle(createProjectDto);
  }
}
