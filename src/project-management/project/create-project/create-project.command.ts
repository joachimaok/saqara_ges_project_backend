import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from '../project.schema';
import { CreateProjectDto } from './create-project.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class CreateProjectCommand {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async handle(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    const createProjectDtoWithUserId = Object.assign(createProjectDto, {
      user: user._id,
    });
    const createdProject = new this.projectModel(createProjectDtoWithUserId);
    return createdProject.save();
  }
}
