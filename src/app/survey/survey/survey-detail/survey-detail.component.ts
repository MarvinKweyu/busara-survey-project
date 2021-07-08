import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SurveyService} from "../../survey.service";
import {FormBuilder} from "@angular/forms";
import {NotificationService} from "../../../shared/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {
  currentForm: any;

  questionAnswers = Array();
  surveyAnswers = [];
  startingTime: any;

  constructor(
    private surveyService: SurveyService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private change: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.tokenValid()) {
      this.authService.logout();
    }
    this.activatedRoute.params.subscribe(params => {
        this.getTargetForm(params.id)
    })
  }

  private getTargetForm(id: any) {
    this.surveyService.getSurvey().subscribe( (response: any) =>{
      this.currentForm = response.forms.find((formItem: { id: number; }) => formItem.id === Number(id));
      if(!this.currentForm){
        this.notificationService.showError('Unable to get this form at this time','Could not retrieve this survey')
      }
    })
  }



  submitForm() {
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
      "survey_id": this.currentForm.id

    }

    const userResponse = [surveyResponseData];

    this.surveyService.submitSurvey(userResponse).subscribe(response =>{
      // {
      //   "message": "details saved successfully"
      // }
      // @ts-ignore
      if(response.message === 'details saved successfully'){
        this.notificationService.showSuccess('Survey filled successfully', 'Survey filled')
        this.showAllForms();
      }else{
        this.notificationService.showError('Could not submit survey at this time', 'Failed to submit form')
      }
    })


  }


  inputData(event: any, question: any) {
    const formData = {
      column_match: question.column_match,
      q_ans: event.target.value,
      q_id: question.id
    }

    this.updateAnswers(formData);

  }

  surveyOptionSelect(option: any, question: any) {
    // find id of option in question
    const option_id = question.q_options.find((q_option: { name: any; }) => q_option.name ===  option.value)
    const formData = {
      column_match: question.column_match,
      q_ans: option_id.id,
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

  showAllForms() {
    this.router.navigate(['survey/view']);
  }

  onBlur(q_section: any, page: any, question: any) {
    // add show error on question
    // find the question id in the array of answers and show error if empty
    const existence = this.questionAnswers.find(ans => ans.q_id === Number(question.id))
    if(existence) {
      //  item exists already. Check the field q_ans if empty and show error
      // update question to have showError: true
      if (!existence.q_ans){
        // console.log('item exists but has no ans')
        question.showError = true;
      }else{
        question.showError = false;
        // if input is phone number, check against accepted phone numbers
        if(question.type === 'tel'){
          question.showError = !this.isValidPhoneNumber(existence.q_ans);
        }
      }
      this.change.detectChanges();
    }else{
      // console.log('item does not exist yet user has left field.Add error')
     // item does not exist
      question.showError = true;
    }
    this.change.detectChanges();
  }

   isValidPhoneNumber(value: string) {
    return (/^\d{7,}$/).test(value.replace(/[\s()+\-\.]|ext/gi, ''));
  }
}
