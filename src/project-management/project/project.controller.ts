import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateProjectCommand } from './create-project/create-project.command';
import { Project } from './project.schema';
import { CreateProjectDto } from './create-project/create-project.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(private readonly createProjectCommand: CreateProjectCommand) {}

  @ApiOperation({ summary: 'Create a new project' })
  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req,
  ): Promise<Project> {
    return this.createProjectCommand.handle(createProjectDto, req.user);
  }
}
