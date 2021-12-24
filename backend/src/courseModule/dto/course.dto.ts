import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/authModule/entities/user.entity';

export class RegisterCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  courseId: string | number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  courseBatchId: string | number;
}
