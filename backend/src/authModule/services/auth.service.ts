import { ChangePasswordDto } from './../dto/auth.dto';
import { EmailService } from './../../commonModule/services/email.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/commonModule/services/encryption.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '../entities/user.entity';
import { SignUpDto } from '../dto/auth.dto';

const FE_URL = 'https://andreassujono.com/ntux/#';

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

    // if (!user.emailVerifiesAt)
    //   return {
    //     user,
    //     status: 'NOT_CONFIRMED',
    //   };

    const payload = { email: user.email, userId: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
      user,
      status: 'CONFIRMED',
    };
  }

  async refreshToken(userId: number) {
    const user = await this.userRepo.findOne({ id: userId });

    if (!user)
      return {
        access_token: null,
      };

    const payload = { email: user.email, userId: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
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

  async signUp(body: SignUpDto, role?: UserRole, isVerified?: boolean) {
    try {
      let tempPassword = body.hashedPassword;
      tempPassword = await this.encryptionService.hash(tempPassword);
      const longCode = this.generateLongCode();
      delete body.id;

      const user = await this.userRepo.save(
        this.userRepo.create({
          ...body,
          hashedPassword: tempPassword,
          confirmationCode: longCode,
          codeExpiresAt: new Date(new Date().getTime() + 3600000), //1hour
          role: role || UserRole.STUDENT,
          emailVerifiesAt: isVerified ? new Date() : null,
          deletedAt: null,
          isActive: true,
        }),
      );

      if (!isVerified) {
        //send email confirmation with code
        this.emailService.sendEmail(
          body.email,
          'NTUX: Confirm your email',
          `Please go to this link to confirm your email: ${FE_URL}/confirm-email/?email=${body.email}&token=${longCode}`,
          'confirmEmail',
          {
            LINK: `${FE_URL}/confirm-email/?email=${body.email}&token=${longCode}`,
            link: `${FE_URL}/confirm-email/?email=${body.email}&token=${longCode}`,
          },
        );
        return {
          user,
          status: 'NOT_CONFIRMED',
        };
      }
      return {
        user,
        status: 'CONFIRMED',
      };
    } catch (err) {
      console.log(err);
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
        `Please go to this link to confirm your email: ${FE_URL}/confirm-email/?email=${email}&token=${longCode}`,
        'confirmEmail',
        {
          link: `${FE_URL}/confirm-email/?email=${email}&token=${longCode}`,
        },
      );

    if (type === 'FORGOT_PASSWORD')
      this.emailService.sendEmail(
        email,
        'NTUX: Reset your password',
        `Please go to this link to change your password: ${FE_URL}/confirm-forgot-password/?email=${email}&token=${longCode}`,
        'forgotPassword',
        {
          link: `${FE_URL}/confirm-forgot-password/?email=${email}&token=${longCode}`,
        },
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
      'NTUX: Reset your Password',
      `Please go to this link to change your password: ${FE_URL}/confirm-forgot-password/?email=${email}&token=${longCode}`,
      'forgotPassword',
      {
        link: `${FE_URL}/confirm-forgot-password/?email=${email}&token=${longCode}`,
      },
    );

    return {
      user,
      status: 'NOT_CONFIRMED',
    };
  }

  async confirmForgotPassword(
    email: string,
    confirmationCode: string,
    // newPassword: string,
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

    // const hashedPassword = await this.encryptionService.hash(newPassword);

    // user.hashedPassword = hashedPassword;
    // await this.userRepo.save(user);

    //send email that you have forgot password
    // this.emailService.sendEmail(
    //   email,
    //   'NTUX: Successfully changed your password',
    //   'You have succesfully changed your password',
    // );

    return {
      status: 'SUCCESS', //redirect user to login
    };
  }

  async resetPassword(body: any) {
    const user = await this.userRepo.findOne({ email: body.email });
    if (!user)
      throw new BadRequestException(
        'Email is not registered! Please Sign Up first',
      );

    if (user.confirmationCode !== body.token)
      throw new BadRequestException('Code is incorrect');
    if (user.codeExpiresAt < new Date())
      throw new BadRequestException('Code is expired, Please forgot password!');

    const hashedPassword = await this.encryptionService.hash(body.password);

    user.hashedPassword = hashedPassword;
    await this.userRepo.save(user);

    return {
      status: 'SUCCESS', //redirect user to login
    };
  }

  async changePassword(body: ChangePasswordDto) {
    const user = await this.validateUser(body.email, body.currentPassword);

    const hashedPassword = await this.encryptionService.hash(body.newPassword);

    user.hashedPassword = hashedPassword;
    await this.userRepo.save(user);

    return {
      status: 'SUCCESS', //redirect user to login
    };
  }
}
