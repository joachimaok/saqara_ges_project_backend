import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Project, ProjectDocument } from '../project.schema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class DeleteProjectUseCase {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async handle(id: string, user: User): Promise<void> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    if (project.user.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        `You do not have permission to delete this project`,
      );
    }
    await this.projectModel.deleteOne({ _id: id }).exec();
  }
}
