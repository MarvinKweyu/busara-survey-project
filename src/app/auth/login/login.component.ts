import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError = false;
  loginServerError = '';
  emptyForm = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): any {
    if (!this.loginForm.valid) {
      return;
    }

    const loginInfo = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(loginInfo)
      .subscribe(
        (loginRes: any) => {
          // { "token_type": "Bearer",
          //   "scope": "groups read write",
          //   "expires_in": 36000,
          //   "refresh_token": "<your_refresh_token>",
          //   "permissions": [<A list of user permissions>],
          //   "access_token": "<your_access_token>"
          //     }
          console.log(loginRes);
          this.authService.saveToken(
            loginRes
          );
          this.authService.saveRefreshToken(
            loginRes
          );
          console.log('reddirecting')
          const redirectUrl = this.authService.redirectUrl;
          console.log('redirecturl ', redirectUrl)
          this.router.navigate(['survey']);
        },
        (loginErr: any) => {
          this.loginError = true;
          console.log(loginErr);
          if (loginErr.error[0].non_field_errors[0] === 'Invalid login credentials') {
            this.loginServerError = 'Invalid login credentials. Please try again.';
          } else if (loginErr.error[0].non_field_errors[0] === 'Unable to login with provided credentials') {
            this.loginServerError = 'A user with the provided credentials does not exist.';
          }
        }
      );
  }

  get addLoginFormControls(): any {
    return this.loginForm.controls;
  }

  isSubmitted(): any {
    if (!this.loginForm.valid) {
      this.emptyForm = true;
    }
  }

}
