import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { GrossPackageConfigService } from './config.service';

@Module({
  controllers: [ConfigController],
  providers: [GrossPackageConfigService],
  exports: [GrossPackageConfigService],
})
export class AppConfigModule {}
