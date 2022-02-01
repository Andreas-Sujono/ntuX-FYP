import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authModule/auth.module';
import { JwtAuthGuard } from './authModule/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CommonModule } from './commonModule/common.module';
import { RolesGuard } from './authModule/roles/roles.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CourseModule } from './courseModule/course.module';
import { ForumModule } from './forumModule/forum.module';
import { TutoringModule } from './tutoringModule/tutoring.module';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1m' },
    }),
    ForumModule,
    AuthModule,
    CommonModule,
    CourseModule,
    TutoringModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
