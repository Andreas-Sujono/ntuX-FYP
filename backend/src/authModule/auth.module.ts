import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { LocalStrategy } from './local.strategy';
import { CommonModule } from 'src/commonModule/common.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    CommonModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, LocalStrategy],
  exports: [UserService, AuthService],
})
export class AuthModule {}
