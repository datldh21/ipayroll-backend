import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimekeepingController } from './timekeeping.controller';
import { TimekeepingService } from './timekeeping.service';
import { Timekeeping } from '../database/entities/timekeeping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timekeeping])],
  controllers: [TimekeepingController],
  providers: [TimekeepingService],
  exports: [TimekeepingService],
})
export class TimekeepingModule {}
