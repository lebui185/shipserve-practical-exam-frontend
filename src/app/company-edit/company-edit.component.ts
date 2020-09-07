import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@authentication';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Constant as Constant } from '@constant';
import { CompanyService } from '../service/company.service';
import { Observable } from 'rxjs';
import { CompanyDTO } from '../model/company-dto';
import { ToastrService } from 'ngx-toastr';
import { CompanyTypeDTO } from '../model/company-type-dto';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyForm: FormGroup;
  showCompanyFormValidation: boolean;
  isEdit: boolean;
  companyId: number;
  Constant: any;
  companyTypes: Observable<CompanyTypeDTO>;
  
  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showCompanyFormValidation = false;
    this.isEdit = this.router.url.includes('companies/edit');
    this.Constant = Constant;

    this.companyTypes = this.companyService.findAllCompanyTypes();

    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: [''],
      typeId: [''],
      active: [true],
    });
    
    if (this.isEdit) {
      this.activatedRoute.params.subscribe(params => this.companyId = params.companyId);

      this.companyService.findCompanyById(this.companyId).subscribe((companyDTO: CompanyDTO) => {
        this.setCompanyFormValue(companyDTO);
      });
    }
  }

  setCompanyFormValue(companyDTO: CompanyDTO) {
    const companyFormValue = this.mapCompanyDTOToCompanyFormValue(companyDTO);
    this.companyForm.patchValue(companyFormValue);
    this.showCompanyFormValidation = false;
  }

  mapCompanyDTOToCompanyFormValue(companyDTO) {
    const companyFormValue = {...companyDTO};
    companyFormValue.typeId = companyDTO.type.id;
    delete companyFormValue.type;
    return companyFormValue
  }

  saveCompany(): void {
    this.showCompanyFormValidation = true;
    if (this.companyForm.invalid) {
      return;
    }

    if (this.isEdit) {
      this.companyService
        .updateCompany(this.companyId, this.companyForm.value)
        .subscribe((companyDTO: CompanyDTO) => {
          this.toastr.success('Update company successfully');
          this.setCompanyFormValue(companyDTO);
        });
    } else {
      this.companyService
        .createCompany(this.companyForm.value)
        .subscribe((companyDTO: CompanyDTO) => {
          this.toastr.success('Create company successfully');
          this.setCompanyFormValue(companyDTO);
        });
    }
  }
}
