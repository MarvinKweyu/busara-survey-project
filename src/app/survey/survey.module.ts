import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    SurveyComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
