import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { CommonModule } from 'src/commonModule/common.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PremiumSetting } from 'src/commonModule/entities/premiumSetting.entity';
import { Avatar } from 'src/commonModule/entities/avatar.entity';
import { Course } from 'src/courseModule/entities/course.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, PremiumSetting, Avatar, Course]),
    PassportModule,
    CommonModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [UserService, AuthService],
})
export class AuthModule {}
