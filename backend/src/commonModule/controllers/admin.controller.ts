import { Roles } from '../../authModule/roles/roles.decorator';
import { Controller, Get } from '@nestjs/common';
import { UserRole } from 'src/authModule/entities/user.entity';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('summary')
  @Roles(UserRole.ADMIN, UserRole.LECTURER)
  async getSummary() {
    return this.adminService.getSummary();
  }
}
