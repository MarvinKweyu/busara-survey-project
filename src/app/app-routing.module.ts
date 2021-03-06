import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'survey',
    loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
