import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../survey.service";

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {
  surveyData: any;

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.surveyService.getSurvey().subscribe( (response: any) =>{
      console.log('survey response', response)
      this.surveyData = response
    })
  }

}
