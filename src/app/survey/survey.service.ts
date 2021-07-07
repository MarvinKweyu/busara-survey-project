import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {NotificationService} from "../shared/notification.service";

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
    return this.http.get(this.busaraSurvey,this.authService.getHeaders())
  }

  getProfile (): any{
    return this.http.get(this.busaraProfile,this.authService.getHeaders())
  }

  submitSurvey(surveyData: any){
    return this.http.post(this.busaraSurveyAnswers, surveyData,this.authService.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(err: { error: { errors: any; Error: any; }; status: any; }) {
    // * catch errors not returned in the response of the service
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.Error}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.error.errors[0].errors[0]}`;
    }
    alert(errorMessage)
    return throwError(errorMessage);
  }
}
