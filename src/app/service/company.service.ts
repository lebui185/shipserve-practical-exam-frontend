import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { CompanyDTO } from '../model/company-dto';
import { CompanyTypeDTO } from '../model/company-type-dto';

@Injectable()
export class CompanyService {

  private readonly BASE_URL = `${environment.serverApiUrl}/companies`; 

  constructor(private http: HttpClient) {}

  findCompanyById(companyId: number): Observable<CompanyDTO> {
    return this.http.get<CompanyDTO>(`${this.BASE_URL}/${companyId}`);
  }

  findAllCompanies(): Observable<CompanyDTO[]> {
    return this.http.get<CompanyDTO[]>(`${this.BASE_URL}`);
  }

  createCompany(companySaveDTO): Observable<CompanyDTO> {
    return this.http.post<CompanyDTO>(`${this.BASE_URL}`, companySaveDTO);
  }

  updateCompany(companyId: number, companySaveDTO): Observable<CompanyDTO> {
    return this.http.put<CompanyDTO>(`${this.BASE_URL}/${companyId}`, companySaveDTO);
  }

  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${companyId}`);
  }

  findAllCompanyTypes(): Observable<CompanyTypeDTO> {
    return this.http.get<CompanyTypeDTO>(`${environment.serverApiUrl}/company-types`);
  }

}
