import {
  LoginDto,
  SignUpDto,
  ForgotPasswordDto,
  ConfirmForgotPasswordDto,
  ResendConfirmationDto,
} from './../dto/auth.dto';
import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Public } from '../public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Get('confirm-email')
  async confirmEmail(
    @Query('email') email: string,
    @Query('token') token: string,
  ) {
    return this.confirmEmail(email, token);
  }

  @Post('resend-confirmation-code')
  async resendConfirmation(@Body() body: ResendConfirmationDto) {
    return this.authService.resendConfirmationEmail(body.email, body.type);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('confirm-forgot-password')
  async confirmForgotPassword(@Body() body: ConfirmForgotPasswordDto) {
    return this.authService.confirmForgotPassword(
      body.email,
      body.confirmationCode,
      body.password,
    );
  }
}
