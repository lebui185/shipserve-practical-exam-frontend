import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { EmployeeDTO } from '../model/employee-dto';

@Injectable()
export class EmployeeService {

  private readonly BASE_URL = `${environment.serverApiUrl}/employees`; 

  constructor(private http: HttpClient) {}

  findById(employeeId: number): Observable<EmployeeDTO> {
    return this.http.get<EmployeeDTO>(`${this.BASE_URL}/${employeeId}`);
  }

  findAllEmployees(): Observable<EmployeeDTO[]> {
    return this.http.get<EmployeeDTO[]>(`${this.BASE_URL}`);
  }

  createEmployee(employeeSaveDTO): Observable<EmployeeDTO> {
    return this.http.post<EmployeeDTO>(`${this.BASE_URL}`, employeeSaveDTO);
  }

  updateEmployee(employeeId: number, employeeSaveDTO): Observable<EmployeeDTO> {
    return this.http.put<EmployeeDTO>(`${this.BASE_URL}/${employeeId}`, employeeSaveDTO);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/${employeeId}`);
  }

}
