import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/authModule/public.decorator';
import { CommonService } from '../services/common.service';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Post('upload-file')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.commonService.uploadFile(file, file.mimetype);
  }
}
