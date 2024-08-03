import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Task Description', required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;

  @ApiProperty({ example: 'Project ID' })
  @IsNotEmpty()
  @IsString()
  readonly projectId: string;
}
