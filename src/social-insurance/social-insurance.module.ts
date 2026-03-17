import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialInsuranceController } from './social-insurance.controller';
import { SocialInsuranceService } from './social-insurance.service';
import { SiMonthlyRecord } from '../database/entities/si-monthly-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiMonthlyRecord])],
  controllers: [SocialInsuranceController],
  providers: [SocialInsuranceService],
  exports: [SocialInsuranceService],
})
export class SocialInsuranceModule {}
