import { TaxBracketVersion } from './tax-bracket-version.entity';
export declare class TaxBracket {
    id: string;
    versionId: string;
    version: TaxBracketVersion;
    bracketOrder: number;
    incomeFrom: number;
    incomeTo: number | null;
    rate: number;
}
