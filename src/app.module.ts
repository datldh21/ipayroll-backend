import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TimekeepingModule } from './timekeeping/timekeeping.module';
import { SocialInsuranceModule } from './social-insurance/social-insurance.module';
import { VariableIncomesModule } from './variable-incomes/variable-incomes.module';
import { ProposalsModule } from './proposals/proposals.module';
import { AppConfigModule } from './config/config.module';
import { PayrollModule } from './payroll/payroll.module';
import * as Joi from 'joi';
import {
  User,
  Employee,
  EmployeeContract,
  Dependent,
  TaxBracketVersion,
  TaxBracket,
  SiRateVersion,
  SiRate,
  PayrollConfig,
  WorkingDayCalendar,
  Timekeeping,
  SiMonthlyRecord,
  VariableIncome,
  PayrollBatch,
  PayrollRecord,
  PayrollRecordDetail,
  PayrollBatchLog,
  PayrollRecordAdjustment,
  Proposal,
} from './database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3001),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default('postgres'),
        DB_PASSWORD: Joi.string().default('postgres'),
        DB_NAME: Joi.string().default('ipayroll'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [
          User,
          Employee,
          EmployeeContract,
          Dependent,
          TaxBracketVersion,
          TaxBracket,
          SiRateVersion,
          SiRate,
          PayrollConfig,
          WorkingDayCalendar,
          Timekeeping,
          SiMonthlyRecord,
          VariableIncome,
          PayrollBatch,
          PayrollRecord,
          PayrollRecordDetail,
          PayrollBatchLog,
          PayrollRecordAdjustment,
          Proposal,
        ],
        synchronize: config.get('NODE_ENV') === 'development',
      }),
    }),
    EmployeesModule,
    TimekeepingModule,
    SocialInsuranceModule,
    VariableIncomesModule,
    ProposalsModule,
    AppConfigModule,
    PayrollModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
