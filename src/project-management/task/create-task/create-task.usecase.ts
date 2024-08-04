import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task, TaskDocument } from '../task.schema';
import { CreateTaskDto } from './create-task.dto';
import {
  Project,
  ProjectDocument,
} from 'src/project-management/project/project.schema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async handle(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { projectId, name, description } = createTaskDto;
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) {
      throw new BadRequestException(`Project with ID ${projectId} not found`);
    }
    if (project.user.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        `You do not have permission to add tasks to this project`,
      );
    }

    const createdTask = new this.taskModel({
      name,
      description,
      project: projectId,
    });
    const task = await createdTask.save();

    project.tasks.push(task);
    await project.save();

    return task;
  }
}
