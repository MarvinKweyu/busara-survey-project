import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../survey.service";

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {
  surveyForms: any;

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.surveyService.getSurvey().subscribe( (response: any) =>{
      this.surveyForms = response.forms
    })
  }

  goToSurvey(survey: any) {
    console.log('survey name', survey.name)
  }

  submitForm() {

  }
}
