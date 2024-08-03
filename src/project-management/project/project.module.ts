import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { CreateProjectUseCase } from './create-project/create-project.usecase';
import { Project, ProjectSchema } from './project.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UpdateProjectUseCase } from './update-project/update-project.usecase';
import { FindProjectUseCase } from './find-project/find-project.usecase';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [CreateProjectUseCase, UpdateProjectUseCase, FindProjectUseCase],
})
export class ProjectModule {}
