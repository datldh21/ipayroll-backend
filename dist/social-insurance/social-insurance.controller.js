"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialInsuranceController = void 0;
const common_1 = require("@nestjs/common");
const social_insurance_service_1 = require("./social-insurance.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FindSiQueryDto {
    year;
    month;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2020),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], FindSiQueryDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], FindSiQueryDto.prototype, "month", void 0);
let SocialInsuranceController = class SocialInsuranceController {
    socialInsuranceService;
    constructor(socialInsuranceService) {
        this.socialInsuranceService = socialInsuranceService;
    }
    findByPeriod(query) {
        const year = query.year ?? new Date().getFullYear();
        const month = query.month ?? new Date().getMonth() + 1;
        return this.socialInsuranceService.findByPeriod(year, month);
    }
    update(id, dto) {
        return this.socialInsuranceService.update(id, dto);
    }
};
exports.SocialInsuranceController = SocialInsuranceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindSiQueryDto]),
    __metadata("design:returntype", void 0)
], SocialInsuranceController.prototype, "findByPeriod", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SocialInsuranceController.prototype, "update", null);
exports.SocialInsuranceController = SocialInsuranceController = __decorate([
    (0, common_1.Controller)('social-insurance'),
    __metadata("design:paramtypes", [social_insurance_service_1.SocialInsuranceService])
], SocialInsuranceController);
//# sourceMappingURL=social-insurance.controller.js.map