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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const payroll_service_1 = require("./payroll.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GeneratePayrollDto {
    month;
    year;
    createdBy;
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GeneratePayrollDto.prototype, "month", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2020),
    (0, class_validator_1.Max)(2100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GeneratePayrollDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GeneratePayrollDto.prototype, "createdBy", void 0);
class ApproveBatchDto {
    approvedBy;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApproveBatchDto.prototype, "approvedBy", void 0);
class UpdateRecordDto {
    commission;
    commissionDetail;
    bonus;
    bonusDetail;
    otherIncome;
    otherIncomeDetail;
    otherAllowance;
    otherAllowanceDetail;
    retroDeduction;
    retroAddition;
    remainingLeave;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRecordDto.prototype, "commission", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRecordDto.prototype, "commissionDetail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRecordDto.prototype, "bonus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRecordDto.prototype, "bonusDetail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRecordDto.prototype, "otherIncome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRecordDto.prototype, "otherIncomeDetail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRecordDto.prototype, "otherAllowance", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRecordDto.prototype, "otherAllowanceDetail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRecordDto.prototype, "retroDeduction", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRecordDto.prototype, "retroAddition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRecordDto.prototype, "remainingLeave", void 0);
let PayrollController = class PayrollController {
    payrollService;
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    findAllBatches() {
        return this.payrollService.findAllBatches();
    }
    generatePayroll(dto) {
        return this.payrollService.generatePayroll(dto.month, dto.year, dto.createdBy);
    }
    approveBatch(id, dto) {
        return this.payrollService.approveBatch(id, dto.approvedBy);
    }
    updateRecord(batchId, recordId, dto) {
        return this.payrollService.updateRecord(batchId, recordId, dto);
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Get)('batches'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "findAllBatches", null);
__decorate([
    (0, common_1.Post)('batches/generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneratePayrollDto]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "generatePayroll", null);
__decorate([
    (0, common_1.Patch)('batches/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ApproveBatchDto]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "approveBatch", null);
__decorate([
    (0, common_1.Patch)('batches/:batchId/records/:recordId'),
    __param(0, (0, common_1.Param)('batchId')),
    __param(1, (0, common_1.Param)('recordId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdateRecordDto]),
    __metadata("design:returntype", void 0)
], PayrollController.prototype, "updateRecord", null);
exports.PayrollController = PayrollController = __decorate([
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map