import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ProjectModule, TaskModule],
})
export class ProjectManagementModule {}
