import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../survey.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {
  surveyForms: any;
  questionAnswers = Array();
  surveyAnswers = [];
  startingTime: any;


  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder
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
    console.log('form data',this.questionAnswers);
    const surveyResponseData = {
      "ans": this.questionAnswers,
      "end_time": "2021-02-03 11:35:16.649 +0300",
      "local_id": 0,
      "location": {
        "accuracy": 0,
        "lat": 0,
        "lon": 0
      },
      "start_time": "2021-02-03 11:27:37.739 +0300",
      "survey_id": "<SurveyID-Retrieve this from the FORM Data>"

    }


  }


  inputData(event: any, question: any) {
    const formData = {
      column_data: question.column_match,
      q_ans: event.target.value,
      q_id: question.id
    }

    this.updateAnswers(formData);

  }

  surveyOptionSelect(option: any, question: any) {
    const formData = {
      column_data: question.column_match,
      q_ans: option.value,
      q_id: question.id
    }
    this.updateAnswers(formData);

  }

  private updateAnswers(formInfo: any): void {
    const existence = this.questionAnswers.findIndex(answer => answer.q_id === formInfo.q_id)
    if(existence >= 0){
      //  item exists already. Adjust q ans if changed
      //Update object's answer property property.
      this.questionAnswers[existence].q_ans = formInfo.q_ans
    }else{
      this.questionAnswers.push(formInfo)
    }
  }
}
