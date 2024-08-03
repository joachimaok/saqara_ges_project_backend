import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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
}
