import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@authentication';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showLoginFormValidation: boolean;
  
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showLoginFormValidation = false;

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // debug
    this.loginForm.setValue({
      username: 'admin',
      password: 'Abcd@1234'
    });
  }

  login(): void {
    this.showLoginFormValidation = true;
    if (this.loginForm.invalid) {
      return;
    }
    
    this.authenticationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        res => {
          this.router.navigate(['/']);
        },
        errorRes => {
          if (errorRes.status === 403) {
            this.loginForm.setErrors({ incorrectUsernamePassword: true });
          }
        }
      );
  }

}
