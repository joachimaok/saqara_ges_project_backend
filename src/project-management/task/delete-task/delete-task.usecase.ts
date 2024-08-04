import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Task, TaskDocument } from '../task.schema';
import {
  Project,
  ProjectDocument,
} from 'src/project-management/project/project.schema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async handle(taskId: string, user: User): Promise<void> {
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
        `You do not have permission to delete this task`,
      );
    }

    // Delete the task
    await this.taskModel.deleteOne({ _id: taskId }).exec();

    // Remove the task reference from the project
    project.tasks = project.tasks.filter((task) => task.toString() !== taskId);
    await project.save();
  }
}
