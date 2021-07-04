import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../survey.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.surveyService.getProfile().subscribe((profile: any) =>{
      this.userProfile = profile
    })

  }

}
