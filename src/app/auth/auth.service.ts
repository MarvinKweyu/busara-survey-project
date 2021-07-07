import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {BROWSER_STORAGE} from "./storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = environment.busara + 'api/v1/oauth/token/';
  redirectUrl = 'survey/view';
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
    return this.http.post(this.loginUrl, loginInfo, options);
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

  getTokenExpirationTime(): any {
    return Number(this.storage.getItem('busara-token-expiration'));
  }

  saveToken(token: string): any {
    this.storage.setItem('busara-token', token);
  }

  saveRefreshToken(refreshToken: string): any {
    this.storage.setItem('busara-refresh-token', refreshToken);
  }

  saveExpirationTime(expiresIn: number): any{
    // add to current date, the expiratin time
    const timeOfDep = new Date().getTime() + (expiresIn * 1000);
    this.storage.setItem('busara-token-expiration', String(timeOfDep));
  }

  isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const expiration = this.getTokenExpirationTime();
      return expiration > Date.now()
    } else {
      return false;
    }
  }

  getHeaders(): any {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
        Accept: '*/*'
      })
    };
  }

}
