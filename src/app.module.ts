import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProjectManagementModule } from './project-management/project-management.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    ProjectManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
