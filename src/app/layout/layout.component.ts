import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@authentication';
import { Router } from '@angular/router';
import { Constant as Constant } from '@constant';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  loggedInUserFullName: string;
  Constant: any;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.Constant = Constant;
    const loggedInUser = this.authenticationService.getLoggedInUser();
    this.loggedInUserFullName = `${loggedInUser.firstName} ${loggedInUser.surname}`;
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
