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
  questions = Array();

  valuesString = '';
  valuesArray = Array();

  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.surveyService.getSurvey().subscribe( (response: any) =>{
      this.surveyForms = response.forms
      const questions = Array();
      console.log('pages', response.forms);
      // @ts-ignore
      response.forms.forEach(formData =>{
        console.log('form data', formData.pages);
        // @ts-ignore
        formData.pages.sections.forEach(question =>{
          const data = {
            column_match: question.column_match,
            id: question.id,
            type: question.type
          }
          questions.push(data)
        })
      })

      console.log('madness', questions);
    })
  }


  goToSurvey(survey: any) {
    console.log('survey name', survey.name)
  }



  submitForm() {
    const valuesStr = this.valuesString.split(" "); //split based on ' ' and store on a variable
    this.valuesArray = valuesStr.map(x => parseInt(x)); //convert each item to int

    //perform your computation
    const results = this.valuesArray[0] - this.valuesArray[1];
    console.log(results);
  }


}
