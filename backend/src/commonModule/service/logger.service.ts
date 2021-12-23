import { LoggerService as CommonLoggerService } from '@nestjs/common';

export class LoggerService implements CommonLoggerService {
  log(message: any, ...optionalParams: any[]) {
    this.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.verbose(message, ...optionalParams);
  }
}
