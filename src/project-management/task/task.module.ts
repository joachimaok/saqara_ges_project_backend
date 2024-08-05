import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { CreateTaskUseCase } from './create-task/create-task.usecase';
import { Task, TaskSchema } from './task.schema';
import { AuthModule } from 'src/auth/auth.module';
import { Project, ProjectSchema } from '../project/project.schema';
import { UpdateTaskUseCase } from './update-task/update-task.usecase';
import { DeleteTaskUseCase } from './delete-task/delete-task.usecase';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [CreateTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase],
})
export class TaskModule {}
