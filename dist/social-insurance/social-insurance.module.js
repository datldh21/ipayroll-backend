"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialInsuranceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const social_insurance_controller_1 = require("./social-insurance.controller");
const social_insurance_service_1 = require("./social-insurance.service");
const si_monthly_record_entity_1 = require("../database/entities/si-monthly-record.entity");
let SocialInsuranceModule = class SocialInsuranceModule {
};
exports.SocialInsuranceModule = SocialInsuranceModule;
exports.SocialInsuranceModule = SocialInsuranceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([si_monthly_record_entity_1.SiMonthlyRecord])],
        controllers: [social_insurance_controller_1.SocialInsuranceController],
        providers: [social_insurance_service_1.SocialInsuranceService],
        exports: [social_insurance_service_1.SocialInsuranceService],
    })
], SocialInsuranceModule);
//# sourceMappingURL=social-insurance.module.js.map