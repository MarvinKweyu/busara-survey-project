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
  busaraSurveyAnswers = environment.busara + 'api/v1/recruitment/answers/submit/'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  getSurvey (): any{
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer HERfHpjCqUqKd22IwmA5F759ytnZMS`
    });
    return this.http.get(this.busaraSurvey,this.authService.getHeaders())
  }

  getProfile (): any{
    return this.http.get(this.busaraProfile,this.authService.getHeaders())
  }

  submitSurvey(surveyData: any){
    console.log('data submitting', surveyData);
    return this.http.post(this.busaraSurveyAnswers, surveyData,this.authService.getHeaders())
  }
}
