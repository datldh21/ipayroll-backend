import { Controller, Get } from '@nestjs/common';
import { GrossPackageConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: GrossPackageConfigService) {}

  @Get('gross-package')
  getGrossPackage() {
    return this.configService.getGrossPackage();
  }
}
