import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../survey.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../shared/notification.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {
  surveyForms: any;

  private surveyId: any;

  // @ts-ignore
  form: FormGroup;


  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.surveyService.getSurvey().subscribe( (response: any) =>{
      this.surveyForms = response.forms
    },
      // @ts-ignore
      (error) =>{
      this.notificationService.showError('Could not display survey forms at this time','Unable to get forms')
      })
  }


  goToSurvey(survey: any) {
    this.surveyId = survey.id;
    this.router.navigate(['survey/detail', survey.id]);

  }



}
