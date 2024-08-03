import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project-management/project/project.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
