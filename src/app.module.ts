import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project-management/project/project.module';
import { TaskModule } from './project-management/task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
