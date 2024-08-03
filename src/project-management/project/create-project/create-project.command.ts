import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from '../project.schema';
import { CreateProjectDto } from './create-project.dto';

@Injectable()
export class CreateProjectCommand {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async handle(createProjectDto: CreateProjectDto): Promise<Project> {
    const createedProject = new this.projectModel(createProjectDto);
    return createedProject.save();
  }
}
