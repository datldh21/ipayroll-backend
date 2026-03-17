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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollConfig = void 0;
const typeorm_1 = require("typeorm");
let PayrollConfig = class PayrollConfig {
    id;
    configKey;
    configValue;
    effectiveFrom;
    effectiveTo;
    description;
};
exports.PayrollConfig = PayrollConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_key', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], PayrollConfig.prototype, "configKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'config_value', type: 'decimal', precision: 20, scale: 4 }),
    __metadata("design:type", Number)
], PayrollConfig.prototype, "configValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_from', type: 'date' }),
    __metadata("design:type", Date)
], PayrollConfig.prototype, "effectiveFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effective_to', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], PayrollConfig.prototype, "effectiveTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PayrollConfig.prototype, "description", void 0);
exports.PayrollConfig = PayrollConfig = __decorate([
    (0, typeorm_1.Entity)('payroll_configs'),
    (0, typeorm_1.Index)('idx_payroll_configs_key_date', ['configKey', 'effectiveFrom'])
], PayrollConfig);
//# sourceMappingURL=payroll-config.entity.js.map