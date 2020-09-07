import { CompanyTypeDTO } from './company-type-dto';

export interface CompanyDTO {
  id: number;
  name: string;
  address: string;
  type: CompanyTypeDTO;
  active: boolean;
}
