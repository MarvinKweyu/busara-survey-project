import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SurveyComponent} from "./survey/survey.component";
import {ProfileComponent} from "./profile/profile.component";
import {SurveyViewComponent} from "./survey/survey-view/survey-view.component";

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent ,
    children: [
      {
        path: 'view',
        component: SurveyViewComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
