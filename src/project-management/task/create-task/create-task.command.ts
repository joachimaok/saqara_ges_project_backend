import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../task.schema';
import { CreateTaskDto } from './create-task.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskCommand {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async handle(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }
}
