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
exports.SiRate = void 0;
const typeorm_1 = require("typeorm");
const si_rate_version_entity_1 = require("./si-rate-version.entity");
let SiRate = class SiRate {
    id;
    versionId;
    version;
    siType;
    party;
    rate;
};
exports.SiRate = SiRate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SiRate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'version_id', type: 'uuid' }),
    __metadata("design:type", String)
], SiRate.prototype, "versionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => si_rate_version_entity_1.SiRateVersion),
    (0, typeorm_1.JoinColumn)({ name: 'version_id' }),
    __metadata("design:type", si_rate_version_entity_1.SiRateVersion)
], SiRate.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'si_type', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], SiRate.prototype, "siType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'party', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], SiRate.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rate', type: 'decimal', precision: 5, scale: 4 }),
    __metadata("design:type", Number)
], SiRate.prototype, "rate", void 0);
exports.SiRate = SiRate = __decorate([
    (0, typeorm_1.Entity)('si_rates'),
    (0, typeorm_1.Unique)(['versionId', 'siType', 'party']),
    (0, typeorm_1.Index)('idx_si_rates_version', ['versionId', 'siType', 'party'])
], SiRate);
//# sourceMappingURL=si-rate.entity.js.map