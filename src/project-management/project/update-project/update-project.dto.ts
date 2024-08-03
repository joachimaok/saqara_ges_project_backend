import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from '../create-project/create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
