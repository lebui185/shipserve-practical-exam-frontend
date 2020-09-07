import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@authentication';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { EmployeeDTO } from '../model/employee-dto';
import { Constant as Constant } from '@constant';
import { CompanyService } from '../service/company.service';
import { Observable } from 'rxjs';
import { CompanyDTO } from '../model/company-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  showEmployeeFormValidation: boolean;
  isEdit: boolean;
  employeeId: number;
  Constant: any;
  companies: Observable<CompanyDTO[]>;
  
  constructor(
    public authenticationService: AuthenticationService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showEmployeeFormValidation = false;
    this.isEdit = this.router.url.includes('employees/edit');
    this.Constant = Constant;

    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', this.isEdit ?  [] : [Validators.required]],
      roles: [[], [Validators.required]],
      active: [true],
      companyId: [],
    });
    
    if (this.isEdit) {
      this.activatedRoute.params.subscribe(params => this.employeeId = params.employeeId);

      this.employeeService.findById(this.employeeId).subscribe((employeeDTO: EmployeeDTO) => {
        this.employeeForm.patchValue(employeeDTO);
      });
    } else {
      if (this.authenticationService.hasAnyRoles(Constant.ROLE_COMPANY_ADMIN)) {
        this.employeeForm.patchValue({ companyId: this.authenticationService.getLoggedInUser().companyId });
      }
    }

    if (this.authenticationService.hasAnyRoles(Constant.ROLE_SUPER_ADMIN)) {
      this.companies = this.companyService.findAllCompanies();
    }
  }

  saveEmployee(): void {
    this.showEmployeeFormValidation = true;
    if (this.employeeForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.employeeService
        .updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe((employeeDTO: EmployeeDTO) => {
          this.toastr.success('Update employee successfully');
          this.employeeForm.patchValue(employeeDTO);
          this.showEmployeeFormValidation = false;
        });
    } else {
      this.employeeService
        .createEmployee(this.employeeForm.value)
        .subscribe((employeeDTO: EmployeeDTO) => {
          this.toastr.success('Create employee successfully');
          this.employeeForm.patchValue(employeeDTO);
          this.showEmployeeFormValidation = false;
        });
    }
  }

}
