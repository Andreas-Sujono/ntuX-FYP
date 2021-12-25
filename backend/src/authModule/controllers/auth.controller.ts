import {
  LoginDto,
  SignUpDto,
  ForgotPasswordDto,
  ConfirmForgotPasswordDto,
  ResendConfirmationDto,
  ChangePasswordDto,
} from './../dto/auth.dto';
import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Public } from '../public.decorator';
import { UserData } from '../user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @Get('confirm-email')
  async confirmEmail(
    @Query('email') email: string,
    @Query('token') token: string,
  ) {
    return this.authService.confirmEmail(email, token);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: any) {
    return this.authService.resetPassword(body);
  }

  @Post('change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @UserData('email') email: string,
  ) {
    body.email = email;
    return this.authService.changePassword(body);
  }

  @Public()
  @Post('resend-confirmation')
  async resendConfirmation(@Body() body: ResendConfirmationDto) {
    return this.authService.resendConfirmationEmail(body.email, body.type);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Public()
  @Post('confirm-forgot-password')
  async confirmForgotPassword(@Body() body: ConfirmForgotPasswordDto) {
    return this.authService.confirmForgotPassword(
      body.email,
      body.confirmationCode,
      body.password,
    );
  }
}
