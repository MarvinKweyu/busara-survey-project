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

  valuesString = '';
  valuesArray = Array();

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
  }


  inputData(event: any, question: any) {
    const formData = {
      column_data: question.column_match,
      q_ans: event.target.value,
      q_id: question.id
    }
    const existence = this.questionAnswers.findIndex(answer => answer.q_id === formData.q_id)
    if(existence >= 0){
    //  item exists already. Adjust q ans if changed
      //Update object's answer property property.
      this.questionAnswers[existence].q_ans = formData.q_ans
    }else{
      this.questionAnswers.push(formData)
    }
  }
}
