import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { CompanyDTO } from '../model/company-dto';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {

  company$: Observable<CompanyDTO>
  // companyId: 

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.company$ = this.activatedRoute.params.pipe(
      switchMap(params => this.companyService.findCompanyById(params.companyId))
    );
    
    // .subscribe(params => this.companyId = params.companyId);
    // this.company = this.companyService.findCompanyById();
  }

}
