import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Project, ProjectDocument } from '../project.schema';
import { UpdateProjectDto } from './update-project.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UpdateProjectUseCase {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<Project>,
  ) {}

  async handle(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user: User,
  ): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    if (project.user.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        'You are not allowed to update this project',
      );
    }
    Object.assign(project, updateProjectDto);
    return project.save();
  }
}
