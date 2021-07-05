import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {BROWSER_STORAGE} from "./storage";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = environment.busara + 'api/v1/auth/login/';

  getUserUrl = environment.busara + 'api/v1/accounts/users';
  refreshTokenUrl = environment.busara + 'api/v1/accounts/token/refresh/';
  redirectUrl = '/survey';
  logoutUrl = environment.busara + 'api/v1/auth/logout/';
  private headers = new HttpHeaders(
    {
      'Content-Type':  'application/x-www-form-urlencoded',
      Accept: '*/*',
    }
  );

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }


  login(loginData: any): any {
    const clientDetail = {
      client_id: 'zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu',
      client_secret: 'Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R'
    }
    const options = { headers: this.headers};
    const loginInfo = `grant_type=password&username=${loginData.username}&password=${loginData.password}&client_id=${clientDetail.client_id}&client_secret=${clientDetail.client_secret}`
    return this.http.post(this.loginUrl, loginInfo, options).pipe(
      tap(
          (res) => console.log('login service',res),
        //   (err) => console.log(err)
      ));
  }

  logout(): any {
    this.http.get(this.logoutUrl);
    this.storage.removeItem('busara-token');
    this.storage.removeItem('busara-refresh-token');
  }

  getToken(): any {
    return this.storage.getItem('busara-token');
  }

  getRefreshToken(): any {
    return this.storage.getItem('busara-refresh-token');
  }

  saveToken(token: string): any {
    this.storage.setItem('busara-token', token);
  }

  saveRefreshToken(refreshToken: string): any {
    this.storage.setItem('busara-refresh-token', refreshToken);
  }

  isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      // const payload = JSON.parse(atob(token.split('.')[1]));
      // return payload.exp > (Date.now() / 1000);
      return true
    } else {
      return false;
    }
  }

  getHeaders(): any {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ekZUpjvGhHGZRZPlQoCiDxf2OBccJj`,
        Accept: '*/*'
      })
    };
  }

  isTokenExpiring(): boolean {
    const token: string = this.getToken();
    const payload = JSON.parse(atob(token.split('.')[1]));
    const tokenValidity = payload.exp - (Date.now() / 1000);
    if (this.isLoggedIn()) {
      return tokenValidity < 36000;
    } else {
      return false;
    }
  }

  refreshToken(): any {
    if (this.isLoggedIn() && this.isTokenExpiring() ) {
      this.http.post(this.refreshTokenUrl, this.getRefreshToken(), this.getHeaders()).subscribe(
        (tokenResponse: any) => {
          this.saveToken(tokenResponse.access);
          this.saveRefreshToken(tokenResponse.refresh);
        }
      );
    }
  }

  getCurrentUser(): any {
    return this.http.get(this.getUserUrl, this.getHeaders());
  }

  saveCurrentUserName(currentUser: string): any {
    this.storage.setItem('u?', currentUser);
  }

  getCurrentUserName(): any {
    return this.storage.getItem('u?');
  }

}
