import { Injectable } from '@nestjs/common';

@Injectable()
export class GrossPackageConfigService {
  getGrossPackage() {
    return {
      baseSalary: 0,
      lunch: 1_000_000,
      phone: 0,
    };
  }
}
