import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Task, TaskDocument } from '../task.schema';
import { UpdateTaskDto } from './update-task.dto';
import {
  Project,
  ProjectDocument,
} from 'src/project-management/project/project.schema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async handle(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const project = await this.projectModel.findById(task.project).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${task.project} not found`);
    }
    if (project.user.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        `You do not have permission to update this task`,
      );
    }

    Object.assign(task, updateTaskDto);
    return task.save();
  }
}
