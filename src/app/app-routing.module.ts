import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationGuard, LoginGuard } from '@authentication';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { Constant } from '@constant';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyViewComponent } from './company-view/company-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'companies',
        component: CompanyListComponent,
        canActivate: [AuthenticationGuard],
        data: { 
          permittedRoles: [Constant.ROLE_SUPER_ADMIN]
        }
      },
      {
        path: 'companies/view/:companyId',
        component: CompanyViewComponent,
        canActivate: [AuthenticationGuard],
        data: { 
          permittedRoles: [Constant.ROLE_USER]
        }
      },
      {
        path: 'companies/edit/:companyId',
        component: CompanyEditComponent,
        canActivate: [AuthenticationGuard],
        data: { 
          permittedRoles: [Constant.ROLE_SUPER_ADMIN, Constant.ROLE_COMPANY_ADMIN]
        }
      },
      {
        path: 'companies/create',
        component: CompanyEditComponent,
        canActivate: [AuthenticationGuard],
        data: { 
          permittedRoles: [Constant.ROLE_SUPER_ADMIN]
        }
      },
      {
        path: 'employees',
        component: EmployeeListComponent,
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'employees/edit/:employeeId',
        component: EmployeeEditComponent,
        canActivate: [AuthenticationGuard],
        data: { 
          permittedRoles: [Constant.ROLE_SUPER_ADMIN, Constant.ROLE_COMPANY_ADMIN]
        }
      },
      {
        path: 'employees/create',
        component: EmployeeEditComponent,
        canActivate: [AuthenticationGuard],
        data: { 
          permittedRoles: [Constant.ROLE_SUPER_ADMIN, Constant.ROLE_COMPANY_ADMIN]
        }
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
