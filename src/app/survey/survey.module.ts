import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';


@NgModule({
  declarations: [
    SurveyComponent,
    HeaderComponent,
    ProfileComponent,
    SurveyViewComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
