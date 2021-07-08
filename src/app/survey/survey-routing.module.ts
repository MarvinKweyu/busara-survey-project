import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SurveyComponent} from "./survey/survey.component";
import {ProfileComponent} from "./profile/profile.component";
import {SurveyViewComponent} from "./survey/survey-view/survey-view.component";
import {SurveyDetailComponent} from "./survey/survey-detail/survey-detail.component";
import {AuthGuard} from "../auth/auth.guard";

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
        path: 'detail/:id',
        component: SurveyDetailComponent
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
