import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../survey.service";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.surveyService.getSurvey().subscribe( (response: any) =>{
      console.log('survey response', response)
    })
  }

}
