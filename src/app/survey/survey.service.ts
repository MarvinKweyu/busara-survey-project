import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  busaraSurvey = environment.busara + 'api/v1/recruitment/forms/?node_type=Both'
  busaraProfile = environment.busara + 'api/v1/users/current-user'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getSurvey (): any{
    const myToken = localStorage.getItem('busara-token')
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer FROFwLZMov1pH4yhjphHqGQx4tbB3L`
    });
    console.log("Either There is token or not", myToken);
    return this.http.get(this.busaraSurvey,{headers: httpHeaders})
  }

  getProfile (): any{
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer FROFwLZMov1pH4yhjphHqGQx4tbB3L`
    });
    return this.http.get(this.busaraProfile,{headers: httpHeaders})
  }
}
