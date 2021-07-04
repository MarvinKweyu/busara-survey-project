import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';
import { BiodataFormComponent } from './survey/survey-view/biodata-form/biodata-form.component';
import { EducationFormComponent } from './survey/survey-view/education-form/education-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SurveyComponent,
    HeaderComponent,
    ProfileComponent,
    SurveyViewComponent,
    BiodataFormComponent,
    EducationFormComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyModule { }
