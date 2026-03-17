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
exports.PayrollRecordDetail = void 0;
const typeorm_1 = require("typeorm");
const payroll_record_entity_1 = require("./payroll-record.entity");
let PayrollRecordDetail = class PayrollRecordDetail {
    id;
    recordId;
    record;
    stepGroup;
    stepName;
    formula;
    inputValues;
    resultValue;
};
exports.PayrollRecordDetail = PayrollRecordDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollRecordDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'record_id', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollRecordDetail.prototype, "recordId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_record_entity_1.PayrollRecord, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'record_id' }),
    __metadata("design:type", payroll_record_entity_1.PayrollRecord)
], PayrollRecordDetail.prototype, "record", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'step_group', type: 'int' }),
    __metadata("design:type", Number)
], PayrollRecordDetail.prototype, "stepGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'step_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], PayrollRecordDetail.prototype, "stepName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'formula', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PayrollRecordDetail.prototype, "formula", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'input_values', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], PayrollRecordDetail.prototype, "inputValues", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'result_value', type: 'decimal', precision: 18, scale: 4 }),
    __metadata("design:type", Number)
], PayrollRecordDetail.prototype, "resultValue", void 0);
exports.PayrollRecordDetail = PayrollRecordDetail = __decorate([
    (0, typeorm_1.Entity)('payroll_record_details'),
    (0, typeorm_1.Index)('idx_payroll_record_details_record', ['recordId'])
], PayrollRecordDetail);
//# sourceMappingURL=payroll-record-detail.entity.js.map