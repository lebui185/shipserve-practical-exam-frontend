import { Component, OnInit } from '@angular/core';
import { CompanyDTO } from '../model/company-dto';
import { Constant as Constant } from '@constant';
import { AuthenticationService } from '@authentication';
import { CompanyService } from '../service/company.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  companies: Observable<CompanyDTO[]>;
  Constant: any;

  constructor(
    private companyService: CompanyService,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.Constant = Constant;
    this.companies = this.companyService.findAllCompanies();
  }

  deleteCompany(company: CompanyDTO): void {
    if (confirm(`Are you sure to delete company: ${company.name}?`)) {
      this.companyService.deleteCompany(company.id).subscribe(() => {
        this.toastr.success('Delete company successfully');
        this.companies = this.companyService.findAllCompanies();
      });
    }
  }
}
