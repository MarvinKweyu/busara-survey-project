import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../survey.service";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile = {
    name: '',
    email: '',
    phone_number: '',
    language: '',
    universe_name: ''
  };

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.tokenValid()) {
      this.authService.logout();
    }
    this.surveyService.getProfile().subscribe((profile: any) =>{
      this.userProfile = profile
    })

  }

  showAllSurveys(): void {
    this.router.navigate(['survey/view']);
  }
}
