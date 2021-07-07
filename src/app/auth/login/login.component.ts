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

  loginServerError = '';
  emptyForm = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): any {
    if (!this.loginForm.valid) {
      return;
    }

    const loginInfo = {
      username: this.loginForm.value.email,
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

          this.authService.saveToken(
            loginRes.access_token
          );
          this.authService.saveRefreshToken(
            loginRes.refresh_token
          );
          this.authService.saveExpirationTime(
            loginRes.expires_in
          );
          const redirectUrl = this.authService.redirectUrl;
          this.router.navigate([redirectUrl]);
        },
        (loginErr: any) => {
          this.authService.loginError = true;
          this.authService.loginServerError = 'Invalid login credentials. Please try again.';
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
