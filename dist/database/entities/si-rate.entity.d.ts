import { SiRateVersion } from './si-rate-version.entity';
export declare class SiRate {
    id: string;
    versionId: string;
    version: SiRateVersion;
    siType: 'bhxh' | 'bhyt' | 'bhtn' | 'union_fee';
    party: 'employee' | 'employer';
    rate: number;
}
