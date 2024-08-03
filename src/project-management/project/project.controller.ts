import { Controller, Post, Body } from '@nestjs/common';
import { CreateProjectCommand } from './create-project/create-project.command';
import { Project } from './project.schema';
import { CreateProjectDto } from './create-project/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly createProjectCommand: CreateProjectCommand) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.createProjectCommand.handle(createProjectDto);
  }
}
