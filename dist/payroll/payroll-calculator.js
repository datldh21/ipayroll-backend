"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayrollRecord = calculatePayrollRecord;
const PERSONAL_DEDUCTION = 15_500_000;
const DEPENDENT_DEDUCTION = 6_200_000;
const FLAT_TAX_RATE = 0.1;
const TAX_BRACKETS = [
    { min: 0, max: 5_000_000, rate: 0.05 },
    { min: 5_000_000, max: 10_000_000, rate: 0.1 },
    { min: 10_000_000, max: 18_000_000, rate: 0.15 },
    { min: 18_000_000, max: 32_000_000, rate: 0.2 },
    { min: 32_000_000, max: 52_000_000, rate: 0.25 },
    { min: 52_000_000, max: 80_000_000, rate: 0.3 },
    { min: 80_000_000, max: Infinity, rate: 0.35 },
];
function getTaxMethod(status) {
    if (['chinh_thuc', 'het_thu_viec', 'thai_san'].includes(status)) {
        return 'progressive';
    }
    return 'flat_10';
}
function calculateProgressiveTax(taxAssessableIncome) {
    if (taxAssessableIncome <= 0)
        return 0;
    let remaining = taxAssessableIncome;
    let tax = 0;
    for (const bracket of TAX_BRACKETS) {
        const bracketSize = bracket.max - bracket.min;
        const taxableInBracket = Math.min(remaining, bracketSize);
        tax += taxableInBracket * bracket.rate;
        remaining -= taxableInBracket;
        if (remaining <= 0)
            break;
    }
    return Math.round(tax);
}
function prorate(packageAmount, standardDays, actualDays) {
    if (standardDays <= 0 || actualDays <= 0)
        return 0;
    return Math.round((packageAmount / standardDays) * actualDays);
}
function calculatePayrollRecord(input) {
    const { employee, timekeeping, socialInsurance, variableIncome, grossPackage } = input;
    const retroDeduction = input.retroDeduction ?? 0;
    const retroAddition = input.retroAddition ?? 0;
    const std = timekeeping.standardDays;
    const probDays = timekeeping.probationDays;
    const offDays = timekeeping.officialDays;
    const leaveDays = timekeeping.remainingLeave;
    const pkgBase = grossPackage.baseSalary;
    const pkgLunch = grossPackage.lunch;
    const pkgPhone = grossPackage.phone;
    const probPkgPerf = pkgBase - pkgLunch;
    const pkgPerf = pkgBase - pkgLunch - pkgPhone;
    const proratedBaseSalary = prorate(pkgBase, std, probDays) +
        prorate(pkgBase, std, offDays) +
        prorate(pkgBase, std, leaveDays);
    const totalLunchActual = prorate(pkgLunch, std, probDays) +
        prorate(pkgLunch, std, offDays) +
        prorate(pkgLunch, std, leaveDays);
    const totalPhoneActual = employee.status === 'thu_viec' || employee.status === 'nghi_viec_tv' ? 0 : pkgPhone;
    const proratedPerfBonus = prorate(probPkgPerf, std, probDays) +
        prorate(pkgPerf, std, offDays) +
        prorate(pkgPerf, std, leaveDays);
    const proratedTotal = proratedBaseSalary + totalLunchActual + totalPhoneActual + proratedPerfBonus;
    const totalVariableIncome = variableIncome.commission +
        variableIncome.bonus +
        variableIncome.otherIncome +
        variableIncome.otherAllowance;
    const grossSalary = proratedTotal + totalVariableIncome;
    const nonTaxableLunch = totalLunchActual;
    const nonTaxablePhone = totalPhoneActual;
    const taxableIncome = grossSalary - nonTaxableLunch - nonTaxablePhone;
    const taxMethod = getTaxMethod(employee.status);
    let pit = 0;
    let personalDeduction = 0;
    let dependentDeduction = 0;
    let taxAssessableIncome = 0;
    if (taxMethod === 'progressive') {
        personalDeduction = PERSONAL_DEDUCTION;
        dependentDeduction = employee.dependents * DEPENDENT_DEDUCTION;
        taxAssessableIncome = Math.max(0, taxableIncome -
            socialInsurance.siEmployee -
            personalDeduction -
            dependentDeduction);
        pit = calculateProgressiveTax(taxAssessableIncome);
    }
    else {
        taxAssessableIncome = taxableIncome;
        pit = Math.round(taxableIncome * FLAT_TAX_RATE);
    }
    const totalDeduction = pit + socialInsurance.siEmployee + retroDeduction;
    const netSalary = grossSalary - totalDeduction + retroAddition;
    const totalEmployerCost = netSalary + socialInsurance.siEmployer + socialInsurance.unionFee;
    return {
        pkgBaseSalary: pkgBase,
        pkgLunch,
        pkgPhone,
        pkgPerfBonus: pkgPerf,
        pkgTotal: pkgBase + pkgLunch + pkgPhone + pkgPerf,
        probPkgBaseSalary: pkgBase,
        probPkgLunch: pkgLunch,
        probPkgPerfBonus: probPkgPerf,
        probPkgTotal: pkgBase + pkgLunch + probPkgPerf,
        standardDays: std,
        actualDays: timekeeping.actualDays,
        probationDays: probDays,
        officialDays: offDays,
        unpaidLeaveProbation: timekeeping.unpaidLeaveProbation,
        unpaidLeaveOfficial: timekeeping.unpaidLeaveOfficial,
        remainingLeave: leaveDays,
        proratedBaseSalary,
        proratedPerfBonus,
        totalLunchActual,
        totalPhoneActual,
        proratedTotal,
        commission: variableIncome.commission,
        bonus: variableIncome.bonus,
        otherIncome: variableIncome.otherIncome,
        otherAllowance: variableIncome.otherAllowance,
        totalVariableIncome,
        grossSalary,
        nonTaxableLunch,
        nonTaxablePhone,
        taxableIncome,
        siBase: socialInsurance.baseSI,
        siBhxh: socialInsurance.bhxh,
        siBhyt: socialInsurance.bhyt,
        siBhtn: socialInsurance.bhtn,
        siEmployeeTotal: socialInsurance.siEmployee,
        personalDeduction,
        dependentCount: employee.dependents,
        dependentDeduction,
        taxMethod,
        taxAssessableIncome,
        pit,
        unionFee: socialInsurance.unionFee,
        retroDeduction,
        retroAddition,
        totalDeduction,
        netSalary,
        siEmployerBhxh: socialInsurance.bhxhEmployer,
        siEmployerBhyt: socialInsurance.bhytEmployer,
        siEmployerBhtn: socialInsurance.bhtnEmployer,
        siEmployerTotal: socialInsurance.siEmployer,
        employerUnionFee: socialInsurance.unionFee,
        totalEmployerCost,
    };
}
//# sourceMappingURL=payroll-calculator.js.map