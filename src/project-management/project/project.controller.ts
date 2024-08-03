import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { CreateProjectUseCase } from './create-project/create-project.usecase';
import { Project } from './project.schema';
import { CreateProjectDto } from './create-project/create-project.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectDto } from './update-project/update-project.dto';
import { UpdateProjectUseCase } from './update-project/update-project.usecase';
import { FindProjectUseCase } from './find-project/find-project.usecase';

@ApiTags('projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly findProjectUseCase: FindProjectUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new project' })
  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req,
  ): Promise<Project> {
    return this.createProjectUseCase.handle(createProjectDto, req.user);
  }

  @ApiOperation({ summary: 'Update a project by ID' })
  @UseGuards(AuthGuard())
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req,
  ): Promise<Project> {
    return this.updateProjectUseCase.handle(id, updateProjectDto, req.user);
  }

  @ApiOperation({ summary: 'Get all projects for the current user' })
  @UseGuards(AuthGuard())
  @Get('user')
  findAllByUser(@Req() req): Promise<Project[]> {
    return this.findProjectUseCase.findAllByUser(req.user._id);
  }

  @ApiOperation({ summary: 'Get a project by ID for the current user' })
  @UseGuards(AuthGuard())
  @Get('user/:id')
  findOneByUser(@Param('id') id: string, @Req() req): Promise<Project> {
    return this.findProjectUseCase.findOneByUser(id, req.user._id);
  }
}
