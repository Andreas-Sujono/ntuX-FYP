import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class ResendConfirmationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: 'EMAIL_CONFIRMATION' | 'FORGOT_PASSWORD';
}

export class ConfirmForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  confirmationCode: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LogoutDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class SignUpDto extends User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
}
