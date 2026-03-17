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
exports.PayrollRecordAdjustment = void 0;
const typeorm_1 = require("typeorm");
const payroll_record_entity_1 = require("./payroll-record.entity");
const user_entity_1 = require("./user.entity");
let PayrollRecordAdjustment = class PayrollRecordAdjustment {
    id;
    recordId;
    record;
    fieldName;
    oldValue;
    newValue;
    changedBy;
    changedByUser;
    changedAt;
    reason;
};
exports.PayrollRecordAdjustment = PayrollRecordAdjustment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollRecordAdjustment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'record_id', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollRecordAdjustment.prototype, "recordId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_record_entity_1.PayrollRecord),
    (0, typeorm_1.JoinColumn)({ name: 'record_id' }),
    __metadata("design:type", payroll_record_entity_1.PayrollRecord)
], PayrollRecordAdjustment.prototype, "record", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'field_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], PayrollRecordAdjustment.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'old_value', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PayrollRecordAdjustment.prototype, "oldValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_value', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PayrollRecordAdjustment.prototype, "newValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'changed_by', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollRecordAdjustment.prototype, "changedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'changed_by' }),
    __metadata("design:type", user_entity_1.User)
], PayrollRecordAdjustment.prototype, "changedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'changed_at' }),
    __metadata("design:type", Date)
], PayrollRecordAdjustment.prototype, "changedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reason', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PayrollRecordAdjustment.prototype, "reason", void 0);
exports.PayrollRecordAdjustment = PayrollRecordAdjustment = __decorate([
    (0, typeorm_1.Entity)('payroll_record_adjustments')
], PayrollRecordAdjustment);
//# sourceMappingURL=payroll-record-adjustment.entity.js.map