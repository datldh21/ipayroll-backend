import { GrossPackageConfigService } from './config.service';
export declare class ConfigController {
    private readonly configService;
    constructor(configService: GrossPackageConfigService);
    getGrossPackage(): {
        baseSalary: number;
        lunch: number;
        phone: number;
    };
}
