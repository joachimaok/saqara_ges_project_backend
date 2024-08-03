import { IsString, IsOptional, IsEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'Updated Project Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated Project Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
