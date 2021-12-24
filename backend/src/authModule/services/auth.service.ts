import { EmailService } from './../../commonModule/service/email.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/commonModule/service/encryption.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { SignUpDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private encryptionService: EncryptionService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email, isActive: true },
    });
    if (!user)
      throw new UnauthorizedException(
        'Email is not registered!, Try register a course to get account',
      );

    const isMatch = await this.encryptionService.isHashMatched(
      password,
      user.hashedPassword,
    );

    if (!isMatch) throw new UnauthorizedException('Password is incorrect');

    delete user.confirmationCode;
    delete user.codeExpiresAt;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email, isActive: true },
    });
    if (!user)
      throw new UnauthorizedException(
        'Email is not registered!, Try register a course to get account',
      );

    const isMatch = await this.encryptionService.isHashMatched(
      password,
      user.hashedPassword,
    );

    if (!isMatch) throw new UnauthorizedException('Password is incorrect');

    delete user.confirmationCode;
    delete user.codeExpiresAt;

    if (!user.emailVerifiesAt)
      return {
        user,
        status: 'NOT_CONFIRMED',
      };

    const payload = { email: user.email, userId: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
      status: 'CONFIRMED',
    };
  }

  generateLongCode() {
    return uuidv4();
  }
  generateTempPassword() {
    return uuidv4().split('-').join('').slice(0, 10);
  }
  generateShortOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async signUp(body: SignUpDto) {
    try {
      const tempPassword = this.generateTempPassword();
      const longCode = this.generateLongCode();
      const user = await this.userRepo.save({
        ...body,
        hashedPassword: tempPassword,
        confirmationCode: longCode,
        codeExpiresAt: new Date(new Date().getTime() + 3600000), //1hour
        role: 'STUDENT',
        emailVerifiesAt: null,
        deletedAt: null,
        isActive: true,
      });

      //send email confirmation with code
      this.emailService.sendEmail(
        body.email,
        'NTUX: Confirm your email',
        'Please go to this link to confirm your email: http://localhost:3000/confirm-email/?token=' +
          longCode,
      );
      return {
        user,
        status: 'NOT_CONFIRMED',
      };
    } catch (err) {
      throw new BadRequestException('Email is already registered');
    }
  }

  async confirmEmail(email: string, longCode: string) {
    const user = await this.userRepo.findOne({ email });
    if (!user)
      throw new BadRequestException(
        'Email is not registered! Please Sign Up first',
      );
    if (user.confirmationCode !== longCode)
      throw new BadRequestException('Code is incorrect');
    if (user.codeExpiresAt < new Date())
      throw new BadRequestException(
        'Code is expired, Please resend confirmation code again!',
      );
    if (user.emailVerifiesAt)
      throw new BadRequestException('Email is already confirmed');

    user.emailVerifiesAt = new Date();
    await this.userRepo.save(user);

    return {
      user,
      status: 'CONFIRMED',
    };
  }

  async resendConfirmationEmail(
    email: string,
    type: 'EMAIL_CONFIRMATION' | 'FORGOT_PASSWORD',
  ) {
    const user = await this.userRepo.findOne({ email });
    if (!user)
      throw new BadRequestException(
        'Email is not registered! Please Sign Up first',
      );
    if (type === 'EMAIL_CONFIRMATION' && user.emailVerifiesAt)
      throw new BadRequestException('Email is already confirmed');

    const longCode = this.generateLongCode();
    user.confirmationCode = longCode;
    user.codeExpiresAt = new Date(new Date().getTime() + 3600000); //1hour
    await this.userRepo.save(user);

    //send email confirmation with code
    if (type === 'EMAIL_CONFIRMATION')
      this.emailService.sendEmail(
        email,
        'NTUX: Confirm your email',
        'Please go to this link to confirm your email: http://localhost:3000/confirm-email/?token=' +
          longCode,
      );

    if (type === 'FORGOT_PASSWORD')
      this.emailService.sendEmail(
        email,
        'NTUX: Confirm your email',
        'Please go to this link to change your password: http://localhost:3000/forgot-password/?token=' +
          longCode,
      );
    return {
      user,
      status: 'NOT_CONFIRMED',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepo.findOne({ email });
    if (!user)
      throw new BadRequestException(
        'Email is not registered! Please Sign Up first',
      );

    const tempPassword = this.generateTempPassword();
    const longCode = this.generateLongCode();

    user.hashedPassword = tempPassword; //to disable login with old password
    user.confirmationCode = longCode;
    user.codeExpiresAt = new Date(new Date().getTime() + 3600000); //1hour
    await this.userRepo.save(user);

    //send email confirmation with code
    this.emailService.sendEmail(
      email,
      'NTUX: Confirm your email',
      'Please go to this link to change your password: http://localhost:3000/forgot-password/?token=' +
        longCode,
    );

    return {
      user,
      status: 'NOT_CONFIRMED',
    };
  }

  async confirmForgotPassword(
    email: string,
    confirmationCode: string,
    newPassword: string,
  ) {
    const user = await this.userRepo.findOne({ email });
    if (!user)
      throw new BadRequestException(
        'Email is not registered! Please Sign Up first',
      );

    if (user.confirmationCode !== confirmationCode)
      throw new BadRequestException('Code is incorrect');
    if (user.codeExpiresAt < new Date())
      throw new BadRequestException(
        'Code is expired, Please resend confirmation code again!',
      );

    const hashedPassword = await this.encryptionService.hash(newPassword);

    user.hashedPassword = hashedPassword;
    await this.userRepo.save(user);

    //send email that you have forgot password
    this.emailService.sendEmail(
      email,
      'NTUX: Successfully changed your password',
      'You have succesfully changed your password',
    );

    return {
      status: 'SUCCESS', //redirect user to login
    };
  }
}
