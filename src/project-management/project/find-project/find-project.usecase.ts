import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, ProjectDocument } from '../project.schema';

@Injectable()
export class FindProjectUseCase {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async findAllByUser(userId: string): Promise<Project[]> {
    return this.projectModel.find({ user: userId }).populate('user').exec();
  }

  async findOneByUser(id: string, userId: string): Promise<Project> {
    const project = await this.projectModel
      .findOne({ _id: id, user: userId })
      .populate('user')
      .exec();
    if (!project) {
      throw new NotFoundException(
        `Project with ID ${id} not found for user with ID ${userId}`,
      );
    }
    return project;
  }
}
