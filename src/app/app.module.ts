import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from '@authentication';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyService } from './service/company.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeService } from './service/employee.service';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyViewComponent } from './company-view/company-view.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, LayoutComponent, EmployeeListComponent, EmployeeEditComponent, CompanyListComponent, CompanyEditComponent, CompanyViewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    NgxWebstorageModule.forRoot({ prefix: 'shipserv-practical-exam' }),
    LoadingBarHttpClientModule,
    NgSelectModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
  ],
  providers: [
    CompanyService,
    EmployeeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
