import { User } from './user.entity';
export declare class TaxBracketVersion {
    id: string;
    name: string;
    effectiveFrom: Date;
    effectiveTo: Date | null;
    createdBy: string | null;
    createdByUser: User | null;
    createdAt: Date;
}
