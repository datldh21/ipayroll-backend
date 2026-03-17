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
exports.VariableIncomesController = void 0;
const common_1 = require("@nestjs/common");
const variable_incomes_service_1 = require("./variable-incomes.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FindVariableIncomesQueryDto {
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
], FindVariableIncomesQueryDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], FindVariableIncomesQueryDto.prototype, "month", void 0);
let VariableIncomesController = class VariableIncomesController {
    variableIncomesService;
    constructor(variableIncomesService) {
        this.variableIncomesService = variableIncomesService;
    }
    findByPeriod(query) {
        const year = query.year ?? new Date().getFullYear();
        const month = query.month ?? new Date().getMonth() + 1;
        return this.variableIncomesService.findByPeriod(year, month);
    }
    update(id, dto) {
        return this.variableIncomesService.update(id, dto);
    }
};
exports.VariableIncomesController = VariableIncomesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindVariableIncomesQueryDto]),
    __metadata("design:returntype", void 0)
], VariableIncomesController.prototype, "findByPeriod", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], VariableIncomesController.prototype, "update", null);
exports.VariableIncomesController = VariableIncomesController = __decorate([
    (0, common_1.Controller)('variable-incomes'),
    __metadata("design:paramtypes", [variable_incomes_service_1.VariableIncomesService])
], VariableIncomesController);
//# sourceMappingURL=variable-incomes.controller.js.map