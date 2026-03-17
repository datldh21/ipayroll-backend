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
exports.WorkingDayCalendar = void 0;
const typeorm_1 = require("typeorm");
let WorkingDayCalendar = class WorkingDayCalendar {
    id;
    year;
    month;
    standardDays;
    note;
};
exports.WorkingDayCalendar = WorkingDayCalendar;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkingDayCalendar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year', type: 'int' }),
    __metadata("design:type", Number)
], WorkingDayCalendar.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'month', type: 'int' }),
    __metadata("design:type", Number)
], WorkingDayCalendar.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'standard_days', type: 'int' }),
    __metadata("design:type", Number)
], WorkingDayCalendar.prototype, "standardDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], WorkingDayCalendar.prototype, "note", void 0);
exports.WorkingDayCalendar = WorkingDayCalendar = __decorate([
    (0, typeorm_1.Entity)('working_day_calendar'),
    (0, typeorm_1.Unique)(['year', 'month'])
], WorkingDayCalendar);
//# sourceMappingURL=working-day-calendar.entity.js.map