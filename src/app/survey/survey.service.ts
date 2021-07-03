import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  busaraSurvey = environment.busara + 'api/v1/recruitment/forms/?node_type=Both'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getSurvey (): any{
    const myToken = localStorage.getItem('busara-token')
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + myToken
    });
    return this.http.get(this.busaraSurvey, this.authService.getHeaders())
  }
}
