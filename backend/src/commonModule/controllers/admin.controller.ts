import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { UserRole } from 'src/authModule/entities/user.entity';
import { AdminService } from '../services/admin.service';
import { Public } from 'src/authModule/public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('summary')
  @Roles(UserRole.ADMIN, UserRole.LECTURER)
  async getSummary() {
    return this.adminService.getSummary();
  }

  @Get('user/summary')
  @Roles(UserRole.ADMIN, UserRole.LECTURER)
  async getUserSummary(@Query('userId') userId: string) {
    return this.adminService.getUserSummary(userId);
  }

  @Get('test/insert')
  @Public()
  async testInsert() {
    return this.adminService.testInsertData();
  }
}
