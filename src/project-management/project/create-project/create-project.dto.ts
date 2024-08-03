import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class CreateProjectDto {
  @ApiProperty({ example: 'Build wall' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Wall should be very strong.', required: false })
  @IsString()
  readonly description?: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
