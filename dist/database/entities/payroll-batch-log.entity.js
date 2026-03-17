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
exports.PayrollBatchLog = void 0;
const typeorm_1 = require("typeorm");
const payroll_batch_entity_1 = require("./payroll-batch.entity");
const user_entity_1 = require("./user.entity");
let PayrollBatchLog = class PayrollBatchLog {
    id;
    batchId;
    batch;
    action;
    fromStatus;
    toStatus;
    changedBy;
    changedByUser;
    changedAt;
    note;
};
exports.PayrollBatchLog = PayrollBatchLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollBatchLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'batch_id', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollBatchLog.prototype, "batchId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_batch_entity_1.PayrollBatch),
    (0, typeorm_1.JoinColumn)({ name: 'batch_id' }),
    __metadata("design:type", payroll_batch_entity_1.PayrollBatch)
], PayrollBatchLog.prototype, "batch", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'action', type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], PayrollBatchLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'from_status', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], PayrollBatchLog.prototype, "fromStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'to_status', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], PayrollBatchLog.prototype, "toStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'changed_by', type: 'uuid' }),
    __metadata("design:type", String)
], PayrollBatchLog.prototype, "changedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'changed_by' }),
    __metadata("design:type", user_entity_1.User)
], PayrollBatchLog.prototype, "changedByUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'changed_at' }),
    __metadata("design:type", Date)
], PayrollBatchLog.prototype, "changedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], PayrollBatchLog.prototype, "note", void 0);
exports.PayrollBatchLog = PayrollBatchLog = __decorate([
    (0, typeorm_1.Entity)('payroll_batch_logs'),
    (0, typeorm_1.Index)('idx_batch_logs_batch', ['batchId', 'changedAt'])
], PayrollBatchLog);
//# sourceMappingURL=payroll-batch-log.entity.js.map