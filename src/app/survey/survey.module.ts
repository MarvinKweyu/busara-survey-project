import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SurveyDetailComponent } from './survey/survey-detail/survey-detail.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    SurveyComponent,
    HeaderComponent,
    ProfileComponent,
    SurveyViewComponent,
    SurveyDetailComponent
  ],
    imports: [
        CommonModule,
        SurveyRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ]
})
export class SurveyModule { }
