import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement authentication' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Implement user authentication using JWT',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;

  @ApiProperty({ example: '63c43a1e86cd2f983f92e5b2' })
  @IsNotEmpty()
  @IsString()
  readonly projectId: string;
}
