import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../model/employee-dto';
import { EmployeeService } from '../service/employee.service';
import { AuthenticationService } from '@authentication';
import { Constant as Constant } from '@constant';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<EmployeeDTO[]>;
  Constant: any;

  constructor(
    private employeeService: EmployeeService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.Constant = Constant;
    this.employees = this.employeeService.findAllEmployees();
  }

  deleteEmployee(employeeDTO: EmployeeDTO) {
    if (confirm(`Are you sure to delete employee: ${employeeDTO.firstName}?`)) {
      this.employeeService.deleteEmployee(employeeDTO.id).subscribe(() => {
        this.toastr.success('Delete employee successfully');
        this.employees = this.employeeService.findAllEmployees();
      });
    }
  }

}
