export type EmployeeStatus = 'chinh_thuc' | 'thai_san' | 'nghi_viec_ct' | 'het_thu_viec' | 'thu_viec' | 'nghi_viec_tv';
export declare class Employee {
    id: string;
    employeeCode: string;
    fullName: string;
    email: string;
    phone: string | null;
    bankAccount: string | null;
    bankName: string | null;
    department: string | null;
    position: string | null;
    level: string | null;
    orgLevel1: string | null;
    orgLevel2: string | null;
    orgLevel3: string | null;
    orgLevel4: string | null;
    orgLevel5: string | null;
    status: EmployeeStatus;
    onboardDate: Date | null;
    officialDate: Date | null;
    lastWorkingDate: Date | null;
    costAccount: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
