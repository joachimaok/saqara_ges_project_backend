import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { CreateProjectCommand } from './create-project/create-project.command';
import { Project, ProjectSchema } from './project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [CreateProjectCommand],
})
export class ProjectModule {}
