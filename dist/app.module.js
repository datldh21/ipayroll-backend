"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const employees_module_1 = require("./employees/employees.module");
const timekeeping_module_1 = require("./timekeeping/timekeeping.module");
const social_insurance_module_1 = require("./social-insurance/social-insurance.module");
const variable_incomes_module_1 = require("./variable-incomes/variable-incomes.module");
const proposals_module_1 = require("./proposals/proposals.module");
const config_module_1 = require("./config/config.module");
const payroll_module_1 = require("./payroll/payroll.module");
const Joi = __importStar(require("joi"));
const entities_1 = require("./database/entities");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
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
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USERNAME'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    entities: [
                        entities_1.User,
                        entities_1.Employee,
                        entities_1.EmployeeContract,
                        entities_1.Dependent,
                        entities_1.TaxBracketVersion,
                        entities_1.TaxBracket,
                        entities_1.SiRateVersion,
                        entities_1.SiRate,
                        entities_1.PayrollConfig,
                        entities_1.WorkingDayCalendar,
                        entities_1.Timekeeping,
                        entities_1.SiMonthlyRecord,
                        entities_1.VariableIncome,
                        entities_1.PayrollBatch,
                        entities_1.PayrollRecord,
                        entities_1.PayrollRecordDetail,
                        entities_1.PayrollBatchLog,
                        entities_1.PayrollRecordAdjustment,
                        entities_1.Proposal,
                    ],
                    synchronize: config.get('NODE_ENV') === 'development',
                }),
            }),
            employees_module_1.EmployeesModule,
            timekeeping_module_1.TimekeepingModule,
            social_insurance_module_1.SocialInsuranceModule,
            variable_incomes_module_1.VariableIncomesModule,
            proposals_module_1.ProposalsModule,
            config_module_1.AppConfigModule,
            payroll_module_1.PayrollModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map