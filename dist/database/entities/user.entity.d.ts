export declare class User {
    id: string;
    name: string;
    email: string;
    role: 'cb_specialist' | 'manager' | 'admin';
    employeeId: string | null;
    avatarUrl: string | null;
    createdAt: Date;
}
